export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  text: string
  htmlTag?: 'a' | 'button'
  target?: string
  href?: string
}
