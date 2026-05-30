import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css"; // <-- THIS IS THE MISSING LINE!

// Highly optimized local font loading
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

// Modern SEO & Metadata handling
export const metadata: Metadata = {
  title: "Mubarik Osman | Full-Stack Engineer & Creative Strategist",
  description: "Portfolio of Mubarik Osman, a Full-Stack Engineer fusing Data Intelligence with High-End Design to build scalable software.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "Flutter", "Hiigsi Tech"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is critical here so your Dark Mode toggle doesn't throw React errors on reload
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.className} antialiased bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}