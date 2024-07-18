import { ReactNode } from "react"
import { HeadingTitle } from "../types/heading.types"
import { StartEnd } from "../types/common.types"

export interface BenefitItemProps {
  title: HeadingTitle
  text: string
  id: number
}
export interface BenefitsProps {
  title?: HeadingTitle
  titleClass?: string
  cardTitleClass?: string
  icon?: ReactNode
  iconSide?: StartEnd
}
