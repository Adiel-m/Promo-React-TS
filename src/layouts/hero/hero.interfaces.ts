import { HeadingTitle } from "../../components/heading/heading.types"
import { SlotProps } from "../../ts/interfaces"

export interface HeroProps {
  title: HeadingTitle
  titleClass?: string
  text?: string
  btnText?: string
  slot?: SlotProps
}
