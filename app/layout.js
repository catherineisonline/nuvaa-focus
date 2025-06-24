import { Inter, Outfit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-outfit",
});

import "./globals.css";

export const metadata = {
  title: "Nuvaa Focus",
  description: "Your productivity buddy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
