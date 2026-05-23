import hero from "@/assets/hero-splash.jpg";

export type JourneySlide = {
  id: string;
  video_url: string;
  poster_url: string;
  title: string;
  caption: string;
};

// Mỗi slide hỗ trợ link YouTube hoặc file .mp4 dán vào video_url.
// poster_url hiển thị khi video chưa phát — bạn có thể upload ảnh thật qua Visual Edits.
export const journeySlides: JourneySlide[] = [
  { id: "j1", video_url: "", poster_url: hero, title: "Khởi nguồn TINGO", caption: "Hành trình từ cánh đồng nguyên liệu sạch tới ly nước cuối cùng." },
  { id: "j2", video_url: "", poster_url: hero, title: "Công nghệ chuẩn ISO", caption: "Nhà máy đạt chuẩn ISO 22000:2018 — minh bạch từng giọt." },
  { id: "j3", video_url: "", poster_url: hero, title: "Cộng đồng TINGO", caption: "50.000+ khách hàng đã đồng hành cùng lối sống xanh." },
];
