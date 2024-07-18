import { Form } from '../components/Form'
import { Heading } from '../components/Heading'
import { FooterProps } from '../ts/interfaces/footer.interfaces'



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