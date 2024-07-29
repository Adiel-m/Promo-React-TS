import { PageThemeProps } from "./theme.interfaces"

export const pageAndThemeStyles = ({pageTheme, theme }: PageThemeProps) => {
  const body = document.querySelector('body')!
  theme === 'dark' ? (body.className = pageTheme + ' ' + theme) : (body.className = pageTheme)
}