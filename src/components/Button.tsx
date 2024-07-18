import { ReactElement } from 'react'
import { ButtonProps } from '../ts/interfaces/button.interfaces'

export const Button = ({
  className = 'btn',
  text,
  htmlTag = 'button',
  href = '#',
  target,
}: ButtonProps): ReactElement<HTMLAnchorElement | HTMLButtonElement> => {
  return htmlTag === 'button' ? (
    <button className={className}>{text}</button>
  ) : (
    <a className={className} href={href} target={target}>
      {text}
    </a>
  )
}
