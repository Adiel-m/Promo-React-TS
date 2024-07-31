import { ReactNode } from "react"
import { ThemePageType, ThemeType } from "./themeTypes"

export interface ThemePageProps {
  themePage: ThemePageType
  theme: ThemeType
}

export interface themeProps extends ThemePageProps {
  children: ReactNode
}

export type ThemeContextProps = {
  theme: ThemeType
  themePage: ThemePageType
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>
  setPageTheme: React.Dispatch<React.SetStateAction<ThemePageType>>
  updateTheme: (theme: ThemeType) => void
}
