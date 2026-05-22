import { ArrowRight, Play, Leaf, Droplets, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-splash.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-leaf">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-ocean/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf/30 bg-white/70 px-4 py-1.5 text-xs font-semibold text-leaf backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> 100% Nguyên Liệu Tự Nhiên
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            TINGO
            <span className="block text-gradient-brand">Dinh Dưỡng Sống</span>
            <span className="block">Từ Thiên Nhiên</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Cân bằng cơ thể, khơi nguồn năng lượng với đồ uống dinh dưỡng sạch hàng đầu cho người Việt.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-ocean px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              Mua Ngay
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/70 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-white">
              <Play className="h-4 w-4 fill-leaf text-leaf" /> Xem Câu Chuyện
            </button>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "20+", v: "Năm Kinh Nghiệm" },
              { k: "50K+", v: "Khách Hài Lòng" },
              { k: "ISO", v: "22000:2018" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-extrabold text-leaf">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-leaf/15 to-ocean/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 shadow-soft backdrop-blur">
            <img
              src={heroImg}
              alt="Nước ép rau xanh tươi mát TINGO"
              width={1536}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-soft text-leaf">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Chứng nhận</div>
              <div className="text-sm font-bold">HACCP & ISO</div>
            </div>
          </div>
          <div className="absolute -right-2 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-ocean">
              <Droplets className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Tươi mát</div>
              <div className="text-sm font-bold">Mỗi Ngày</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
