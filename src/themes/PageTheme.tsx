import { ThemeContext } from "./ThemeContext"
import { useContext, useEffect } from "react"
import { themeProps } from "./theme.interfaces"
import { pageAndThemeStyles } from "./themeUtils"


export const PageTheme = ({ theme, pageTheme, children }: themeProps) => {
  const { updateTheme } = useContext(ThemeContext)!

  useEffect(() => {
    updateTheme(theme)
    pageAndThemeStyles({ pageTheme, theme })
  }, [pageTheme, theme, updateTheme])

  return <>{children}</>
}