import { ReactNode } from "react"
import { StartEnd } from "../../ts/types"
import { HeadingLevel, HeadingTitle } from "../heading/heading.types"

export interface CardProps {
  title: HeadingTitle
  cardTitleClass?: string
  text: string
  headingLevel?: HeadingLevel
  icon?: ReactNode
  iconSide?: StartEnd
}