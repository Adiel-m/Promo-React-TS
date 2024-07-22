import { ReactNode } from "react";
import { ThemeType } from "../types/common.types";

export interface ThemeProps {
  children: ReactNode
}

export interface PageThemeProps {
  page: string
  pageThemeMode?: ThemeType
}
export interface pageThemeModeProps {
  children: ReactNode
  page: string
  pageThemeMode: ThemeType
}
