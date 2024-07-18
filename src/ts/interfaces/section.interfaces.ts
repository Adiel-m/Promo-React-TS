import { ReactNode } from "react"
import { SectionTag } from "../types/section.types"
import { HeadingTitle } from "../types/heading.types"

export interface SectionProps {
  children: ReactNode
  className: string
  sectionTag?: SectionTag
  title?: HeadingTitle
}
