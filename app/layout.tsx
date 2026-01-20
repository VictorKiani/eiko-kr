import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eiko.kr"),
  title: {
    default: "EIKO.KR - 행운의 번호 생성기",
    template: "%s | EIKO.KR",
  },
  description:
    "당신만의 행운 번호를 생성하세요. 생년월일, 이름, 띠, 꿈 해몽으로 맞춤형 로또 번호를 추천받으세요.",
  keywords: [
    "로또",
    "로또번호생성",
    "행운번호",
    "로또6/45",
    "연금복권",
    "스피또",
    "파워볼",
    "행운",
    "복권",
    "꿈해몽",
  ],
  authors: [{ name: "EIKO.KR" }],
  creator: "EIKO.KR",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://eiko.kr",
    siteName: "EIKO.KR",
    title: "EIKO.KR - 행운의 번호 생성기",
    description:
      "당신만의 행운 번호를 생성하세요. 생년월일, 이름, 띠, 꿈 해몽으로 맞춤형 로또 번호를 추천받으세요.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "EIKO.KR 행운의 번호 생성기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIKO.KR - 행운의 번호 생성기",
    description: "당신만의 행운 번호를 생성하세요.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-neutral-cream font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
