import React, { ReactElement } from 'react'
import { HeadingProps } from './heading.interfaces'

export const Heading = ({ headingLevel = 'h2', children, className }: HeadingProps): ReactElement<HTMLHeadingElement> => {
  const Heading = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(headingLevel, props, children)

  return <Heading className={className}>{children}</Heading>
}
