import React, { createContext, useEffect, useState } from "react";
import { ThemeContextType, ThemeType } from "../ts/types/common.types";
import { Props } from "../ts/interfaces/common.interfaces";

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({children}: Props): React.ReactElement => {
  const [theme, setTheme] = useState<ThemeType>()

  const updateThemeMode = (theme: ThemeType | undefined) => {
    return theme
      ? localStorage.setItem('themeMode', theme)
      : localStorage.setItem('themeMode', 'system')
  }

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode')

    if(themeMode) {
      themeMode === 'light' ? setTheme('light') : setTheme('dark')
    }

    updateThemeMode(theme)
    
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}