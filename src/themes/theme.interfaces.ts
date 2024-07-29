import { ReactNode } from "react"
import { PageThemeType, ThemeType } from "./themeTypes"

export interface PageThemeProps {
  pageTheme: PageThemeType
  theme: ThemeType
}

export interface themeProps extends PageThemeProps {
  children: ReactNode
}

export type ThemeContextProps = {
  theme: ThemeType
  pageTheme: PageThemeType
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
  setPageTheme: React.Dispatch<React.SetStateAction<PageThemeType>>
  updateTheme: (theme: ThemeType) => void
}
