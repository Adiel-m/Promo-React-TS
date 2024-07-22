import { ReactNode } from "react";
import { ThemeType } from "../types/common.types";

export interface Props {
  children?: ReactNode
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
