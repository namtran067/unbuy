import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CLARITY — Trang Sức Kim Cương Trung Thực | Anti-Marketing Jewelry",
  description:
    "Cửa hàng trang sức kim cương đầu tiên nói cho bạn BIẾT TẠI SAO KHÔNG NÊN MUA. Giải mã chiến lược marketing, phân tích giá trị thực, khuyến nghị sản phẩm phù hợp ngân sách & nhu cầu.",
  keywords: ["kim cương", "trang sức", "nhẫn cầu hôn", "anti-marketing", "CLARITY", "lab-grown", "PNJ", "DOJI"],
  authors: [{ name: "CLARITY" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CLARITY — Trang Sức Trung Thực",
    description: "Đừng mua nếu chúng tôi chưa giải mã cho bạn.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
