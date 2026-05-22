import { useEffect, useState } from "react";
import cereal from "@/assets/product-cereal.jpg";
import curcumin from "@/assets/product-curcumin.jpg";
import protein from "@/assets/product-protein.jpg";
import quantum from "@/assets/product-quantum.jpg";
import chocolate from "@/assets/product-chocolate.jpg";
import hero from "@/assets/hero-splash.jpg";

type Slide =
  | { type: "video"; src: string; poster?: string; alt: string }
  | { type: "image"; src: string; alt: string };

// TODO: thay src video bằng URL bạn cung cấp
const slides: Slide[] = [
  { type: "video", src: "", poster: hero, alt: "Video rót nước tươi mát 1" },
  { type: "video", src: "", poster: hero, alt: "Video nước bắn tươi mát" },
  { type: "video", src: "", poster: hero, alt: "Video rót nước tươi mát 2" },
  { type: "image", src: chocolate, alt: "TINGO Chocolate" },
  { type: "image", src: cereal, alt: "TINGO Cereal" },
  { type: "image", src: curcumin, alt: "TINGO Curcumin" },
  { type: "image", src: protein, alt: "TINGO Protein" },
  { type: "image", src: quantum, alt: "TINGO Quantum H₂" },
  { type: "image", src: hero, alt: "TINGO Hero" },
  { type: "image", src: chocolate, alt: "TINGO Bộ Sưu Tập" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-leaf/15 to-ocean/15 blur-2xl" />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 shadow-soft backdrop-blur">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== idx}
          >
            {s.type === "video" && s.src ? (
              <video
                src={s.src}
                poster={s.poster}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={s.type === "video" ? s.poster! : s.src}
                alt={s.alt}
                className="h-full w-full object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-white/70 px-3 py-2 backdrop-blur">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Chuyển đến slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === idx ? "w-6 bg-leaf" : "w-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
