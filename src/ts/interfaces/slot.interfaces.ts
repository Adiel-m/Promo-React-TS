import { ReactNode } from "react"
import { SlotPosition } from "../types/slot.types"

export interface SlotProps {
  position: SlotPosition
  children: ReactNode
}
