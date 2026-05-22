import { ArrowRight, Play, Leaf, Droplets, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-splash.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-leaf">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-ocean/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl whitespace-pre-line">
            {"\n"}
          </h1>
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
