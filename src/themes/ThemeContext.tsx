import React, { createContext, useEffect, useState } from "react";
import { Props } from "../ts/interfaces";
import { PageThemeType, ThemeType } from "./themeTypes";
import { ThemeContextProps } from "./theme.interfaces";

export const ThemeContext = createContext<ThemeContextProps | null>(null)

export const ThemeProvider = ({children}: Props): React.ReactElement => {
  const [theme, setTheme] = useState<ThemeType>('system')
  const [pageTheme, setPageTheme] = useState<PageThemeType>('app')

  const updateTheme = (theme: ThemeType) => {
    return theme
      ? localStorage.setItem('themeMode', theme)
      : localStorage.setItem('themeMode', 'system')
  }

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')
    // Setting Light/Dark Mode
    if (themeMode) {
      themeMode === 'light' ? setTheme('light') : setTheme('dark')
    }
    // Update Local Storage Theme Mode
    updateTheme(theme)

  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        pageTheme,
        setPageTheme,
        setTheme,
        updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}