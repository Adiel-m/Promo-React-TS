import { ThemePageProps } from "./theme.interfaces"

export const pageAndThemeStyles = ({themePage, theme }: ThemePageProps) => {
  const body = document.querySelector('body')!
  theme === 'dark' ? (body.className = themePage + ' ' + theme) : (body.className = themePage)
}