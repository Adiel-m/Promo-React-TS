import { ReactNode } from "react";
import { PageThemeType, ThemeType } from "../types/common.types";

export interface Props {
  children?: ReactNode
}

export interface PageThemeProps {
  pageTheme: string
  pageThemeMode?: ThemeType
}
export interface pageThemeModeProps {
  children: ReactNode
  pageTheme: PageThemeType
  pageThemeMode: ThemeType
}
