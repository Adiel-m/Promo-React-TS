import { ReactNode } from "react";
import { SlotPosition } from "./types";

export interface Props {
  children?: ReactNode
}

export interface SlotProps {
  position: SlotPosition
  children: ReactNode
}