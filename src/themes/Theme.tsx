import { ThemeContext } from "./ThemeContext"
import { useContext, useEffect } from "react"

import { themeProps } from "./theme.interfaces"
import { pageAndThemeStyles } from "./themeUtils"
import { MenuContext } from "../components/navMenu/MenuContext"


export const Theme = ({ theme, themePage, children }: themeProps) => {
    const { handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd } =
      useContext(MenuContext)
  const { updateTheme } = useContext(ThemeContext)!

  useEffect(() => {
    updateTheme(theme)
    pageAndThemeStyles({ themePage, theme })
  }, [themePage, theme, updateTheme])

  return (
    <div
      style={{ minHeight: '100dvh' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}