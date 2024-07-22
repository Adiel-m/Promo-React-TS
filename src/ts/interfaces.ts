import { ReactNode } from "react";
import { PageThemeType, SlotPosition, ThemeType } from "./types";

export interface Props {
  children?: ReactNode
}

export interface PageThemeProps {
  pageTheme: string
  pageThemeMode?: ThemeType
}

export interface pageThemeModeProps {
  children: ReactNode
  pageTheme: PageThemeType
  pageThemeMode: ThemeType
}

export interface SlotProps {
  position: SlotPosition
  children: ReactNode
}