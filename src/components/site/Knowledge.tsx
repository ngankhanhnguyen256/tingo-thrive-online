import { BookOpen, ImageIcon, PlayCircle } from "lucide-react";
import cereal from "@/assets/product-cereal.jpg";
import protein from "@/assets/product-protein.jpg";
import curcumin from "@/assets/product-curcumin.jpg";
import quantum from "@/assets/product-quantum.jpg";

type Slot = {
  id: string;
  title: string;
  text: string;
  image_url: string;
  video_url: string; // YouTube URL hoặc .mp4
};

// 4 ô Content Slot — Visual Edits cho phép upload ảnh / dán URL video / sửa chữ
const slots: Slot[] = [
  { id: "slot-1", title: "Năng Lượng Sạch", text: "Bài viết về nguồn năng lượng bền vững từ cacao và ngũ cốc nguyên cám. Bạn có thể thay nội dung, ảnh hoặc dán video YouTube.", image_url: cereal, video_url: "" },
  { id: "slot-2", title: "Đạm Đậu Nành", text: "Phân tích chuyên sâu về protein thực vật, axit amin thiết yếu và lợi ích tiêu hoá.", image_url: protein, video_url: "" },
  { id: "slot-3", title: "Sữa Non & Nghệ", text: "Tổng hợp công dụng của sữa non và curcumin với hệ miễn dịch và dạ dày.", image_url: curcumin, video_url: "" },
  { id: "slot-4", title: "Hydrogen & Detox", text: "Hướng dẫn uống nước Hydrogen đúng cách để hỗ trợ thanh lọc cơ thể.", image_url: quantum, video_url: "" },
];

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}
function toEmbed(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export function Knowledge() {
  return (
    <section id="knowledge" className="scroll-mt-24 bg-gradient-to-b from-white via-leaf-soft/30 to-accent/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ocean">Kiến Thức TINGO</span>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            CẨM NANG DINH DƯỠNG & <span className="text-gradient-brand">SỨC KHỎE TINGO</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            4 chuyên mục — Sống khỏe mỗi ngày. Click xuống xem chi tiết.
          </p>
        </div>

        {/* Nav: 4 mục Sống khỏe mỗi ngày liên kết xuống 4 slot */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {slots.map((s, idx) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-soft text-leaf font-bold">{idx + 1}</span>
              <span className="text-sm font-semibold">{s.title}</span>
            </a>
          ))}
        </div>

        {/* 4 Content Slot đa năng: ảnh + chữ + video */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {slots.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="scroll-mt-24 group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{s.title}</h3>
              </div>

              {/* Ảnh — Visual Edits click chọn để Upload */}
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-gradient-leaf">
                <img src={s.image_url} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
              </div>

              {/* Văn bản — Visual Edits chỉnh trực tiếp */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>

              {/* Video — dán YouTube URL hoặc .mp4 */}
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-foreground/90">
                {s.video_url ? (
                  isYouTube(s.video_url) ? (
                    <iframe src={toEmbed(s.video_url)} title={s.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <video src={s.video_url} controls playsInline className="h-full w-full object-cover" />
                  )
                ) : (
                  <div className="grid h-full place-items-center text-white/70">
                    <div className="text-center">
                      <PlayCircle className="mx-auto h-10 w-10" />
                      <p className="mt-2 text-xs">Dán YouTube URL hoặc upload .mp4</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <ImageIcon className="h-3.5 w-3.5" /> Ảnh + chữ + video — chỉnh sửa qua Visual Edits.
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
