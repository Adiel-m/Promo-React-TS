import React from 'react'
import { SectionProps } from '../ts/interfaces/section.interfaces'

export const Section = ({
  sectionTag,
  children,
  className = 'section',
  title,
}: SectionProps) => {
  sectionTag = title !== undefined ? 'section' : 'div'

  const SectionEl = ({ ...props }: React.HTMLAttributes<HTMLElement>) =>
    React.createElement(sectionTag, props, children)

  return <SectionEl className={className}>{children}</SectionEl>
}
