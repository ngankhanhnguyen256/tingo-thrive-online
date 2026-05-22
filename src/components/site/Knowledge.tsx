import { BookOpen, ImageIcon, PlayCircle } from "lucide-react";

export function Knowledge() {
  return (
    <section id="knowledge" className="scroll-mt-24 bg-gradient-to-b from-white via-leaf-soft/30 to-accent/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ocean">
            Kiến Thức TINGO
          </span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            CẨM NANG DINH DƯỠNG &{" "}
            <span className="text-gradient-brand">SỨC KHỎE TINGO</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tổng hợp bài viết, hình ảnh và video hướng dẫn giúp bạn xây dựng lối sống lành mạnh mỗi ngày.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Khu vực 1: Văn bản */}
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-soft transition-all hover:-translate-y-1">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold">Bài viết kiến thức</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              [Khu vực dành cho bài viết chuyên sâu. Bạn có thể chèn nội dung về dinh dưỡng,
              chế độ ăn cân bằng, công dụng của từng nguyên liệu TINGO, lời khuyên chuyên gia…]
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              [Đoạn 2 — tuỳ ý bổ sung. Font chữ Be Vietnam Pro được tối ưu cho khả năng đọc dài.]
            </p>
          </article>

          {/* Khu vực 2: Hình ảnh */}
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-ocean">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold">Hình ảnh minh hoạ</h3>
            <div className="mt-4 grid aspect-square place-items-center overflow-hidden rounded-2xl bg-gradient-leaf text-leaf/70">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12" />
                <p className="mt-2 text-xs font-semibold">Chèn hình ảnh tại đây</p>
              </div>
            </div>
          </article>

          {/* Khu vực 3: Video */}
          <article className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf">
              <PlayCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold">Video hướng dẫn</h3>
            <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-foreground/90">
              {/* Thay src bằng link YouTube / Veo 3 của bạn */}
              <iframe
                className="h-full w-full"
                src="about:blank"
                title="Video hướng dẫn TINGO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              [Dán link nhúng YouTube hoặc Veo 3 vào thuộc tính <code>src</code> của iframe.]
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
