import './hero.css'
import { HeroProps } from './hero.interfaces'
import { Button } from '../../components/button/Button'
import { Heading } from '../../components/heading/Heading'
import { Section } from '../section/Section'

export const Hero = ({ ...props }: HeroProps) => {
  const {
    slot,
    title,
    titleClass,
    text,
    btnText,
  } = props

  return (
    <Section title={title} className="section hero">
      {slot && slot.position === 'inSectionFirst' && slot.children}
      <div className="container">
        {slot && slot.position === 'inContainerFirst' && slot.children}
        <div className="col">
          {slot && slot.position === 'inColumnFirst' && slot.children}
          {title && (
            <Heading className={titleClass} headingLevel="h1">
              {Array.isArray(title)
                ? title.map((text, i) => (
                    <span id={`spn-t${i + 1}`} key={i}>
                      {Array.isArray(text) ? (
                        text.map((innerText, j) => (
                          <span id={`spn-in-t${j + 1}`} key={j}>
                            {innerText}
                          </span>
                        ))
                      ) : (
                        <span key={i}>{text}</span>
                      )}
                    </span>
                  ))
                : title}
            </Heading>
          )}
          <p>{text}</p>
          {btnText && <Button htmlTag="a" href="#" text={btnText} />}
          {slot && slot.position === 'inColumnLast' && slot.children}
        </div>
        {slot && slot.position === 'inContainerLast' && slot.children}
      </div>
      {slot && slot.position === 'inSectionLast' && slot.children}
    </Section>
  )
}
