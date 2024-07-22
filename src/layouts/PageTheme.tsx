import { pageAndThemeModeStyles } from "../ts/utils"
import { pageThemeModeProps } from "../ts/interfaces"
import { ThemeContext } from "../context/ThemeContext"
import { useContext, useEffect } from "react"


export const PageTheme = ({ pageTheme, pageThemeMode, children }: pageThemeModeProps) => {
  const themeCtx = useContext(ThemeContext)

  useEffect(() => {
    themeCtx?.updateThemeMode(pageThemeMode)
    pageAndThemeModeStyles({ pageTheme, pageThemeMode })
  }, [pageTheme, themeCtx, pageThemeMode])
  
  return <>{ children }</>
}