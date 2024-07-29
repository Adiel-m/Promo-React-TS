import { ReactNode } from "react"
import { PageThemeType, ThemeType } from "./themeTypes"

export interface PageThemeProps {
  pageTheme: string
  pageThemeMode: ThemeType
}

export interface pageThemeModeProps {
  children: ReactNode
  pageTheme: PageThemeType
  pageThemeMode: ThemeType
}
