import { useEffect, useState } from "react";
import { X, Mail, Phone } from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.45c-.24 1.4-1.7 4.1-5.45 4.1-3.28 0-5.96-2.72-5.96-6.07 0-3.35 2.68-6.07 5.96-6.07 1.87 0 3.12.8 3.84 1.48l2.62-2.53C16.8 3.36 14.6 2.4 12 2.4 6.78 2.4 2.6 6.58 2.6 11.8c0 5.22 4.18 9.4 9.4 9.4 5.42 0 9-3.8 9-9.16 0-.62-.06-1.08-.15-1.54H12z" />
    </svg>
  );
}

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"email" | "phone">("email");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-2xl">
        <div className="relative bg-gradient-leaf p-8 text-center">
          <button onClick={onClose} aria-label="Đóng" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/70 hover:bg-white">
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-2xl font-extrabold">Chào mừng đến TINGO</h2>
          <p className="mt-1 text-sm text-muted-foreground">Đăng nhập để nhận ưu đãi & theo dõi đơn hàng.</p>
        </div>

        <div className="p-6">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-foreground/15 bg-white px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <GoogleIcon className="h-5 w-5" /> Đăng nhập với Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> hoặc <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mb-4 flex rounded-full bg-secondary p-1 text-xs font-semibold">
            <button
              onClick={() => setTab("email")}
              className={`flex-1 rounded-full px-3 py-2 ${tab === "email" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              <Mail className="mr-1 inline h-3.5 w-3.5" /> Email
            </button>
            <button
              onClick={() => setTab("phone")}
              className={`flex-1 rounded-full px-3 py-2 ${tab === "phone" ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              <Phone className="mr-1 inline h-3.5 w-3.5" /> Số điện thoại
            </button>
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type={tab === "email" ? "email" : "tel"}
              placeholder={tab === "email" ? "you@example.com" : "0901 234 567"}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-leaf"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-leaf"
            />
            <button type="submit" className="w-full rounded-full bg-gradient-ocean px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow">
              Đăng nhập
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Chưa có tài khoản? <a href="#" className="font-semibold text-leaf hover:underline">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  );
}
