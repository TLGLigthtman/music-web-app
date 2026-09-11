import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const sbSansCond = localFont({
  src: [
    {
      path: "../fonts/SBSansTextCond-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SBSansTextCond-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sb-sans-cond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Музыка",
  description: "Мобильный стриминг музыки",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Музыка",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${sbSansCond.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col bg-[#04060a] text-white`}>
        {children}
      </body>
    </html>
  );
}
