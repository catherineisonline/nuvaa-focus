import "styled-components";
import type { ThemeType } from "../types/themes";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
