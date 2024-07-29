import { PageThemeProps } from "./theme.interfaces"

export const pageAndThemeModeStyles = ({ pageTheme, pageThemeMode }: PageThemeProps) => {
  const body = document.querySelector('body')!
  pageThemeMode === 'dark'
    ? body.classList.add(pageTheme, pageThemeMode)
    : body.classList.add(pageTheme)
}