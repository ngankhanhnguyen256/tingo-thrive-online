import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Package, CheckCircle2, Truck, Box, Clipboard } from "lucide-react";
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

type OrderStatus = "Đã tiếp nhận" | "Đang đóng gói" | "Đang giao" | "Đã giao";

type Order = {
  customer: string;
  orderDate: string;
  carrier: string;
  trackingCode: string;
  status: OrderStatus;
};

// TODO: Thay bằng URL Webhook Google Sheets / Make / Zapier của bạn
const API_URL = "";

// Mock data để xem thử
const MOCK_DB: Record<string, Order> = {
  "0987654321": {
    customer: "Nguyễn Văn A",
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

async function fetchOrder(query: string): Promise<Order | null> {
  // Gọi API thật nếu đã cấu hình
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}?q=${encodeURIComponent(query)}`, { method: "GET" });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || !data.customer) return null;
      return data as Order;
    } catch {
      return null;
    }
  }
  // Fallback: Mock data
  await new Promise((r) => setTimeout(r, 500));
  const key = query.trim();
  return MOCK_DB[key] ?? null;
}

const STEPS: { key: OrderStatus; label: string; icon: typeof Package }[] = [
  { key: "Đã tiếp nhận", label: "Đã tiếp nhận đơn", icon: Clipboard },
  { key: "Đang đóng gói", label: "Đang đóng gói", icon: Box },
  { key: "Đang giao", label: "Đang giao hàng", icon: Truck },
  { key: "Đã giao", label: "Giao hàng thành công", icon: CheckCircle2 },
];

function statusIndex(s: OrderStatus): number {
  return STEPS.findIndex((x) => x.key === s);
}

function TrackingPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    const result = await fetchOrder(query);
    if (!result) {
      setError("Không tìm thấy thông tin đơn hàng. Vui lòng kiểm tra lại số điện thoại hoặc mã đơn!");
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
              Nhập số điện thoại hoặc mã đơn để xem trạng thái vận chuyển theo thời gian thực.
            </p>

            <form onSubmit={onSearch} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập Số điện thoại hoặc Mã đơn hàng của bạn..."
                className="flex-1 rounded-2xl border border-border bg-white px-5 py-3.5 text-sm shadow-sm outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
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
                <Info label="Đơn vị vận chuyển" value={order.carrier} />
                <Info label="Mã vận đơn" value={order.trackingCode} />
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
