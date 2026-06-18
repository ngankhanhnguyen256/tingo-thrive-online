import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Package, CheckCircle2, Truck, Box, Clipboard, ClipboardCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/tra-cuu-don-hang")({
  head: () => ({
    meta: [
      { title: "Tra cứu đơn hàng — TINGO" },
      { name: "description", content: "Theo dõi hành trình đơn hàng TINGO của bạn theo số điện thoại hoặc mã đơn." },
      { property: "og:title", content: "Tra cứu đơn hàng — TINGO" },
      { property: "og:description", content: "Theo dõi hành trình đơn hàng TINGO theo thời gian thực." },
    ],
  }),
  component: TrackingPage,
});

// ===========================================================
//  CẤU HÌNH WEBHOOK TRA CỨU
//  Khi bạn có Google Sheets / Make / Zapier, hãy dán URL ở đây.
//  Webhook nên trả JSON dạng:
//  {
//    "customer": "Nguyễn Văn A",
//    "phone": "0987654321",
//    "orderDate": "01/06/2026",
//    "carrier": "J&T Express",
//    "trackingCode": "JT123456789",
//    "status": "Đang giao"   // map theo cột "Trạng Thái Đơn Hàng"
//  }
// ===========================================================
const API_URL = "";

// Đồng bộ 5 mốc trạng thái (khớp với cột "Trạng Thái Đơn Hàng" trong Excel)
export type OrderStatus =
  | "Chờ xác nhận đơn"
  | "Đã xác nhận"
  | "Chờ vận chuyển"
  | "Đang giao"
  | "Đã giao";

type Order = {
  customer: string;
  phone?: string;
  orderDate: string;
  carrier?: string;
  trackingCode?: string;
  status: OrderStatus;
};

const STEPS: { key: OrderStatus; label: string; icon: typeof Package }[] = [
  { key: "Chờ xác nhận đơn", label: "Chờ xác nhận đơn", icon: Clipboard },
  { key: "Đã xác nhận", label: "Đã xác nhận đơn", icon: ClipboardCheck },
  { key: "Chờ vận chuyển", label: "Đang đóng gói", icon: Box },
  { key: "Đang giao", label: "Đang giao hàng", icon: Truck },
  { key: "Đã giao", label: "Giao hàng thành công", icon: CheckCircle2 },
];

// Bản đồ alias trạng thái để chấp nhận nhiều cách viết khác nhau từ Google Sheets
const STATUS_ALIASES: Record<string, OrderStatus> = {
  "cho xac nhan don": "Chờ xác nhận đơn",
  "cho xac nhan": "Chờ xác nhận đơn",
  "moi dat": "Chờ xác nhận đơn",
  "da xac nhan": "Đã xác nhận",
  "xac nhan": "Đã xác nhận",
  "cho van chuyen": "Chờ vận chuyển",
  "dang dong goi": "Chờ vận chuyển",
  "dong goi": "Chờ vận chuyển",
  "dang giao": "Đang giao",
  "dang van chuyen": "Đang giao",
  "da giao": "Đã giao",
  "hoan thanh": "Đã giao",
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

function parseStatus(raw?: string): OrderStatus {
  if (!raw) return "Chờ xác nhận đơn";
  const key = normalize(raw);
  if (STATUS_ALIASES[key]) return STATUS_ALIASES[key];
  // thử khớp trực tiếp với các nhãn step
  const direct = STEPS.find((s) => normalize(s.key) === key || normalize(s.label) === key);
  return direct ? direct.key : "Chờ xác nhận đơn";
}

// Demo data cho khi chưa cấu hình webhook
const MOCK_DB: Record<string, Order> = {
  "0987654321": {
    customer: "Nguyễn Văn A",
    phone: "0987654321",
    orderDate: "01/06/2026",
    carrier: "J&T Express",
    trackingCode: "JT123456789",
    status: "Đang giao",
  },
  "TG-2026": {
    customer: "Trần Thị B",
    orderDate: "28/05/2026",
    carrier: "SPX",
    trackingCode: "SPX999888",
    status: "Đã giao",
  },
};

// Đọc các đơn hàng vừa đặt (lưu trong localStorage tại trang Checkout)
type PendingOrder = {
  orderId: string;
  customer: string;
  phone: string;
  orderDate: string;
  status: OrderStatus;
};

function lookupPendingOrder(orderId: string, phone: string): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("tingo_pending_orders_v1");
    if (!raw) return null;
    const list: PendingOrder[] = JSON.parse(raw);
    const oid = orderId.trim().toLowerCase();
    const ph = phone.trim();
    const found = list.find(
      (o) => o.orderId.toLowerCase() === oid && o.phone === ph,
    );
    if (!found) return null;
    return {
      customer: maskName(found.customer),
      phone: maskPhone(found.phone),
      orderDate: found.orderDate,
      carrier: "Đang cập nhật",
      trackingCode: found.orderId,
      status: found.status || "Chờ xác nhận đơn",
    };
  } catch {
    return null;
  }
}

function maskPhone(p: string): string {
  if (!p || p.length < 4) return "***";
  return p.slice(0, 3) + "****" + p.slice(-3);
}
function maskName(n: string): string {
  if (!n) return "***";
  const parts = n.trim().split(/\s+/);
  return parts.map((w, i) => (i === parts.length - 1 ? w : (w[0] || "") + "***")).join(" ");
}

async function fetchOrder(orderId: string, phone: string): Promise<Order | null> {
  // 1) Ưu tiên API/Webhook nếu đã cấu hình — yêu cầu cả mã đơn và SĐT để tránh dò danh sách.
  if (API_URL) {
    try {
      const res = await fetch(
        `${API_URL}?orderId=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`,
        { method: "GET" },
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.customer && data.phone && data.phone === phone.trim()) {
          return {
            ...data,
            customer: maskName(data.customer),
            phone: maskPhone(data.phone),
            status: parseStatus(data.status),
          } as Order;
        }
      }
    } catch {
      // im lặng — fallback xuống local/mock
    }
  }

  // 2) Đọc đơn vừa đặt từ localStorage (yêu cầu khớp cả mã đơn lẫn SĐT)
  const pending = lookupPendingOrder(orderId, phone);
  if (pending) return pending;

  // 3) Fallback demo — yêu cầu khớp cả 2
  await new Promise((r) => setTimeout(r, 400));
  const mock = MOCK_DB[orderId.trim()];
  if (mock && mock.phone === phone.trim()) {
    return { ...mock, customer: maskName(mock.customer), phone: maskPhone(mock.phone) };
  }
  return null;
}

function statusIndex(s: OrderStatus): number {
  return STEPS.findIndex((x) => x.key === s);
}

function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !phone.trim()) {
      setError("Vui lòng nhập cả Mã đơn hàng và Số điện thoại để tra cứu.");
      return;
    }
    setLoading(true);
    setError(null);
    setOrder(null);
    const result = await fetchOrder(orderId, phone);
    if (!result) {
      setError("Không tìm thấy đơn hàng khớp với mã đơn và số điện thoại đã nhập.");
    } else {
      setOrder(result);
    }
    setLoading(false);
  };

  const activeIdx = order ? statusIndex(order.status) : -1;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="bg-gradient-leaf">
        <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
          <div className="rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur sm:p-10">
            <h1 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
              <span className="text-gradient-brand">TRA CỨU HÀNH TRÌNH ĐƠN HÀNG TINGO</span>
            </h1>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Nhập Mã đơn hàng và Số điện thoại đã đặt để xem trạng thái vận chuyển.
            </p>

            <form onSubmit={onSearch} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3">
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Mã đơn hàng (VD: TG-xxxx)"
                className="rounded-2xl border border-border bg-white px-5 py-3.5 text-sm shadow-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại đã dùng khi đặt hàng"
                inputMode="tel"
                className="rounded-2xl border border-border bg-white px-5 py-3.5 text-sm shadow-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-ocean px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                <Search className="h-4 w-4" />
                {loading ? "Đang tìm..." : "Tìm kiếm đơn hàng"}
              </button>
            </form>

            {error && (
              <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-center text-sm font-semibold text-destructive">
                {error}
              </div>
            )}
          </div>

          {order && (
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft sm:p-10">
              {/* Tóm tắt */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Info label="Họ tên khách" value={order.customer} />
                <Info label="Ngày đặt" value={order.orderDate} />
                <Info label="Đơn vị vận chuyển" value={order.carrier || "Đang cập nhật"} />
                <Info label="Mã vận đơn" value={order.trackingCode || "—"} />
              </div>

              {/* Timeline */}
              <div className="mt-10">
                <h2 className="mb-6 text-lg font-bold">Hành trình đơn hàng</h2>

                {/* Desktop: ngang */}
                <ol className="hidden md:flex md:items-start md:justify-between md:gap-2">
                  {STEPS.map((step, i) => {
                    const reached = i <= activeIdx;
                    const Icon = step.icon;
                    return (
                      <li key={step.key} className="relative flex flex-1 flex-col items-center">
                        {i < STEPS.length - 1 && (
                          <div
                            className={`absolute left-1/2 top-6 h-1 w-full -z-0 ${
                              i < activeIdx ? "bg-leaf" : "bg-border"
                            }`}
                          />
                        )}
                        <div
                          className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 transition ${
                            reached
                              ? "border-leaf bg-leaf text-primary-foreground shadow-glow"
                              : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`mt-3 text-center text-xs font-semibold ${
                            reached ? "text-leaf" : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                {/* Mobile: dọc */}
                <ol className="space-y-4 md:hidden">
                  {STEPS.map((step, i) => {
                    const reached = i <= activeIdx;
                    const Icon = step.icon;
                    return (
                      <li key={step.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`grid h-10 w-10 place-items-center rounded-full border-2 ${
                              reached
                                ? "border-leaf bg-leaf text-primary-foreground"
                                : "border-border bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`mt-1 w-1 flex-1 min-h-8 ${i < activeIdx ? "bg-leaf" : "bg-border"}`} />
                          )}
                        </div>
                        <div className="pb-4 pt-2">
                          <div className={`text-sm font-bold ${reached ? "text-leaf" : "text-muted-foreground"}`}>
                            {step.label}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          )}

          {!order && !error && (
            <div className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
              Gợi ý dùng thử: <span className="font-semibold text-foreground">0987654321</span> hoặc{" "}
              <span className="font-semibold text-foreground">TG-2026</span>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-bold text-foreground">{value}</div>
    </div>
  );
}
