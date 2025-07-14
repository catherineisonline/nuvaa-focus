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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexend.variable} ${outfit.variable}`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
