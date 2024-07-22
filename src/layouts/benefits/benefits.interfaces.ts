import { ReactNode } from "react"
import { HeadingTitle } from "../../components/heading/heading.types"
import { StartEnd } from "../../ts/types"

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
