import "styled-components";
import type { ThemeType } from "./themes";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
