import { ReactNode } from "react"
import { SectionTag } from "./section.types"
import { HeadingTitle } from "../../components/heading/heading.types"

export interface SectionProps {
  children: ReactNode
  className: string
  sectionTag?: SectionTag
  title?: HeadingTitle
}
