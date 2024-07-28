export type StartEnd = 'start' | 'end'

export type ThemeType = 'light' | 'dark'

export type PageThemeType = 'elevate' | "empower" | "future" | "socket" | "space" | "vision"

export type SlotPosition =
  | 'inSectionFirst'
  | 'inSectionLast'
  | 'inContainerFirst'
  | 'inContainerLast'
  | 'inColumnFirst'
  | 'inColumnLast'

export type ThemeContextType = {
  theme?: ThemeType
  setTheme: React.Dispatch<React.SetStateAction<ThemeType | undefined>>
  updateThemeMode: (theme: ThemeType | undefined) => void
}

export type StringNumberObj = { [key: string]: number }