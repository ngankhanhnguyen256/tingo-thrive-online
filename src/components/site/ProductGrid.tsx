import { ShoppingCart, ImageIcon } from "lucide-react";
import cereal from "@/assets/product-cereal.jpg";
import curcumin from "@/assets/product-curcumin.jpg";
import protein from "@/assets/product-protein.jpg";
import quantum from "@/assets/product-quantum.jpg";

type Product = {
  img?: string;
  name: string;
  tag: string;
  price: string;
  placeholder?: string;
};

const products: Product[] = [
  { img: cereal, name: "TINGO Cereal", tag: "Ngũ cốc dinh dưỡng", price: "407.455đ" },
  { img: curcumin, name: "TINGO Curcumin Shot", tag: "Nghệ & gừng", price: "220.909đ" },
  { img: protein, name: "TINGO Protein Bar", tag: "Đạm đậu nành", price: "189.000đ" },
  { img: quantum, name: "TINGO Quantum H₂", tag: "Nước Hydrogen", price: "780.545đ" },
  { name: "Cà Phê TINGO", tag: "Thức uống năng lượng", price: "850.000đ", placeholder: "Ly cà phê" },
  { name: "Tổ Yến Đông Trùng Hạ Thảo", tag: "Bồi bổ cao cấp", price: "920.000đ", placeholder: "Hũ tổ yến" },
  { name: "Trà Thảo Mộc TINGO", tag: "Thanh nhiệt", price: "45.000đ", placeholder: "Chai trà thảo mộc" },
  { name: "Nước Sâm Rong Biển TINGO", tag: "Giải nhiệt", price: "35.000đ", placeholder: "Chai nước sâm" },
];

export function ProductGrid() {
  return (
    <section id="products" className="scroll-mt-24 bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-leaf">
              Sản Phẩm Liên Quan
            </span>
            <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Khám phá thêm</h2>
          </div>
          <a href="#" className="text-sm font-bold text-ocean hover:underline">
            Xem tất cả →
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-leaf">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    width={768}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-leaf/70">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-10 w-10" />
                      <p className="mt-2 text-xs font-semibold">{p.placeholder}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-ocean">
                  {p.tag}
                </div>
                <h3 className="mt-1 text-base font-bold">{p.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-leaf">{p.price}</span>
                  <button
                    aria-label={`Thêm ${p.name} vào giỏ`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-gradient-ocean text-primary-foreground transition-transform hover:scale-110"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
