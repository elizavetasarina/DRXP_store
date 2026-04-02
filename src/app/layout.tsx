import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import Navigation from "@/components/layout/Navigation";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DRXP — Contemporary Streetwear",
  description:
    "Explore DRXP's curated collection of contemporary streetwear. Bold designs meet premium quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-neutral-100 font-sans">
        <QueryProvider>
          <AnimationProvider>
            <CustomCursor />
            <Header />
            <Navigation />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </AnimationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
