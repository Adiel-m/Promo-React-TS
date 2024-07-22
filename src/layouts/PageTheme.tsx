import { pageAndThemeModeStyles } from "../ts/utils"
import { pageThemeModeProps } from "../ts/interfaces/common.interfaces"
import { ThemeContext } from "../context/ThemeContext"
import { useContext, useEffect } from "react"


export const PageTheme = ({ page, pageThemeMode, children }: pageThemeModeProps) => {
  const themeCtx = useContext(ThemeContext)

  useEffect(() => {
    themeCtx?.updateThemeMode(pageThemeMode)
    pageAndThemeModeStyles({ page, pageThemeMode })
  }, [page, themeCtx, pageThemeMode])
  
  return <>{ children }</>
}