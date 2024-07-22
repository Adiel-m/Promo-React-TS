import './card.css'
import { ReactElement } from 'react'
import { CardProps } from './card.interfaces'
import { Heading } from '../heading/Heading'


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
