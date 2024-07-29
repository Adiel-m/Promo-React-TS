export type ThemeType = 'light' | 'dark'

export type PageThemeType =
  | 'elevate'
  | 'empower'
  | 'future'
  | 'socket'
  | 'space'
  | 'vision'
  | 'home'
  | string

export type ThemeContextType = {
  theme?: ThemeType
  setTheme: React.Dispatch<React.SetStateAction<ThemeType | undefined>>
  updateThemeMode: (theme: ThemeType | undefined) => void
}
