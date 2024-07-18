import { HeadingTitle } from "../types/heading.types"
import { SlotProps } from "./slot.interfaces"

export interface HeroProps {
  title: HeadingTitle
  titleClass?: string
  text?: string
  btnText?: string
  slot?: SlotProps
}
