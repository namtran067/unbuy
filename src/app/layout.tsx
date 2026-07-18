import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

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
  title: "SAIGONXUA — Trang Sức Trung Thực | Anti-Marketing Jewelry",
  description:
    "Cửa hàng trang sức nói cho bạn BIẾT TẠI SAO KHÔNG NÊN MUA. Phân tích giá trị thực, khuyến nghị sản phẩm phù hợp ngân sách & nhu cầu.",
  keywords: ["trang sức", "kim cương", "nhẫn cầu hôn", "anti-marketing", "SAIGONXUA"],
  authors: [{ name: "SAIGONXUA" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SAIGONXUA — Trang Sức Trung Thực",
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
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </body>
    </html>
  );
}
