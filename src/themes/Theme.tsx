import { useContext, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"

import { themeProps } from "./theme.interfaces"
import { pageAndThemeStyles } from "./themeUtils"


export const Theme = ({ theme, themePage, children }: themeProps) => {
  const { updateTheme } = useContext(ThemeContext)!

  useEffect(() => {
    updateTheme(theme)
    pageAndThemeStyles({ themePage, theme })
  }, [themePage, theme, updateTheme])

  return (
    <>
      {children}
    </>
  )
}