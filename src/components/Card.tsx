import { ReactElement } from 'react'
import { Heading } from './Heading'
import { CardProps } from '../ts/interfaces/card.interfaces'


export const Card = ({ ...props }: CardProps): ReactElement<HTMLUListElement> => {
  const { icon, title, cardTitleClass, headingLevel, text, iconSide } = props

  return (
    <li className="card">
      {iconSide === 'start' && icon}
      <div className="content">
        <Heading
          className={cardTitleClass}
          headingLevel={headingLevel ? headingLevel : 'h3'}
        >
          {title}
        </Heading>
        <p>{text}</p>
      </div>
      {iconSide === 'end' && icon}
    </li>
  )
}
