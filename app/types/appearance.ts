import { StaticImageData } from "next/image";

export interface AppearanceState {
  currentTheme: string;
  currentBackground: string | null | StaticImageData;
  backgrounds: (string | StaticImageData)[];
  customBackgrounds: (string | StaticImageData)[];
  backgroundBlur: number;
  backgroundDim: number;
}
