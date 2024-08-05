import React, { createContext, useEffect, useState } from "react";
import { Props } from "../ts/interfaces";
import { ThemeContextProps } from "./theme.interfaces";
import { booleanOrUndefined } from "./themeTypes";

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({children}: Props): React.ReactElement => {
  // States
  const [isDarkMode, setIsDarkMode] = useState<booleanOrUndefined>(undefined)

  // Effects
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    const scheme = window.matchMedia('(prefers-color-scheme: dark)') // OS color-scheme
    const matches = scheme.matches

    const updateLocalMode = (matches: booleanOrUndefined) => {
      localStorage.setItem('theme', matches ? 'dark' : 'light')
    }

    const updateStyleMode = (matches: booleanOrUndefined) => {
      const body = document.querySelector('body')!

      matches
        ? body.setAttribute('data-theme', 'dark')
        : body.setAttribute('data-theme', 'light')
    }

    const setTheme = (matches: booleanOrUndefined) => {
      setIsDarkMode(matches)
      updateLocalMode(matches)
      updateStyleMode(matches)
    }

    // Initiate Theme Dark/Light
    if (!localTheme) {
      setTheme(matches)
    } else {
      setTheme(localTheme === 'dark')
    }
    
    // update the theme when OS color-scheme change
    scheme.addEventListener('change', (e) => {
      setTheme(e.matches)
    })
  }, [isDarkMode])
  
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}