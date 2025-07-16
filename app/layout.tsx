import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import { Lexend, Outfit } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-lexend",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Nuvaa Focus",
  description: "Your productivity buddy",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${outfit.variable}`}>
      <body className="font-lexend">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
