import StyledComponentsRegistry from "./lib/registry";
import ReduxProvider from "./redux/ReduxProvider";
import { Lexend, Outfit } from "next/font/google";
import ThemeWrapper from "./components/ThemeWrapper";
import { Initilizer } from "./components/home/Initilizer";
import { Overlay } from "./Page.styled";
import Header from "./components/header/Header";
import { Modals } from "./components/home/Modals";

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
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${outfit.variable}`}>
      <body className="font-lexend">
        <ReduxProvider>
          <StyledComponentsRegistry>
            <ThemeWrapper>
              <Initilizer />
              <Overlay />
              <Header />
              {children}
              <Modals />
            </ThemeWrapper>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
