import { pageThemeModeProps } from "./theme.interfaces"
import { ThemeContext } from "./ThemeContext"
import { useContext, useEffect } from "react"
import { pageAndThemeModeStyles } from "./themeUtils"


export const PageTheme = ({ pageTheme, pageThemeMode, children }: pageThemeModeProps) => {
  const themeCtx = useContext(ThemeContext)

  useEffect(() => {
    themeCtx?.updateThemeMode(pageThemeMode)
    pageAndThemeModeStyles({ pageTheme, pageThemeMode })
  }, [pageTheme, themeCtx, pageThemeMode])
  
  return <>{ children }</>
}