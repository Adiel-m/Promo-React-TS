import { ReactNode } from "react"
import { StartEnd } from "../types/common.types"
import { HeadingLevel, HeadingTitle } from "../types/heading.types"

export interface CardProps {
  title: HeadingTitle
  cardTitleClass?: string
  text: string
  headingLevel?: HeadingLevel
  icon?: ReactNode
  iconSide?: StartEnd
}