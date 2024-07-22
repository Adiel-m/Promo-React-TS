import './footer.css'
import { Form } from '../../components/form/Form'
import { Heading } from '../../components/heading/Heading'
import { FooterProps } from './footer.interfaces'

export const Footer = ({...props}: FooterProps) => {
  const { title, titleClass, btnText } = props
  return (
    <footer className="footer">
      <div className="container">
        <Heading className={titleClass} headingLevel="h2">
          {title}
        </Heading>
        <Form btnText={btnText} />
      </div>
    </footer>
  )
}