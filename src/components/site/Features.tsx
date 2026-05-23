import { Zap, Sprout, Sun, Truck } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Năng Lượng Sạch",
    desc: "Cacao và ngũ cốc nguyên cám nuôi dưỡng nguồn năng lượng bền vững suốt cả ngày.",
    tone: "leaf",
  },
  {
    icon: Sprout,
    title: "Đạm Đậu Nành",
    desc: "Protein thực vật giàu axit amin thiết yếu, dễ tiêu hóa, phù hợp mọi đối tượng.",
    tone: "ocean",
  },
  {
    icon: Sun,
    title: "Sữa Non & Nghệ",
    desc: "Sữa non quý giá kết hợp curcumin giúp tăng đề kháng và bảo vệ dạ dày.",
    tone: "leaf",
  },
  {
    icon: Truck,
    title: "Giao Hàng Toàn Quốc",
    desc: "Miễn phí vận chuyển cho đơn từ 500.000đ, giao nhanh chỉ trong 24 giờ.",
    tone: "ocean",
  },
];

export function Features() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-leaf">
            Vì Sao Chọn TINGO
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Sống khoẻ mỗi ngày <br />
            <span className="text-gradient-brand">từ những điều tự nhiên</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((it) => {
            const isLeaf = it.tone === "leaf";
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-2xl transition-opacity group-hover:opacity-100 ${
                    isLeaf ? "bg-leaf/15 opacity-50" : "bg-ocean/15 opacity-50"
                  }`}
                />
                <div
                  className={`relative grid h-14 w-14 place-items-center rounded-2xl ${
                    isLeaf ? "bg-leaf-soft text-leaf" : "bg-accent text-ocean"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-5 text-lg font-bold">{it.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {it.desc}
                </p>
                <a
                  href="#knowledge"
                  className={`relative mt-5 inline-flex items-center gap-1 text-xs font-bold hover:underline ${
                    isLeaf ? "text-leaf" : "text-ocean"
                  }`}
                >
                  Tìm hiểu thêm →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
