import { ReactNode } from "react"
import { StartEnd } from "../types/common.types"
import { HeadingTitle } from "../types/heading.types"

export interface ReviewItemProps {
  name: string
  text: string
  jobTitle: string
  id: number
}
export interface ReviewsProps {
  title?: HeadingTitle
  titleClass?: string
  subtitleClass?: string
  icon?: ReactNode
  iconSide?: StartEnd
}
