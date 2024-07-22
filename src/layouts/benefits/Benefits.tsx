import './benefits.css'
import { BenefitItemProps, BenefitsProps } from './benefits.interfaces'
import { Card } from '../../components/card/Card'
import { Heading } from '../../components/heading/Heading'
import { Section } from '../section/Section'

// Fetch Data
const fetchData = async (): Promise<BenefitItemProps[]> => {
  const res = await fetch('/src/api/benefits.json')
  const data = await res.json()
  return data.items
}

const benefits = await fetchData()

export const Benefits = (  {...props }: BenefitsProps) => {
  const { icon, iconSide, title, cardTitleClass, titleClass } = props

  return (
    <Section className="section benefits">
      <div className="container">
        {title && <Heading className={titleClass} headingLevel="h2">
          {title}
        </Heading>}
        <ul>
          {benefits.map((item: BenefitItemProps) => (
            <Card
              cardTitleClass={cardTitleClass}
              icon={icon}
              iconSide={iconSide}
              key={item.id}
              title={item.title}
              text={item.text}
            />
          ))}
        </ul>
      </div>
    </Section>
  )
}
