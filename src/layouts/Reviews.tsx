import { Heading } from '../components/Heading'
import { ReviewItemProps, ReviewsProps } from '../ts/interfaces/reviews.interfaces'
import { Section } from './Section'

// Fetch Data
const fetchData = async (): Promise<ReviewItemProps[]> => {
  const res = await fetch('/src/api/reviews.json')
  const data = await res.json()
  return data.items
}

const reviews = await fetchData()

export const Reviews = ({ ...props }: ReviewsProps) => {
  const { icon, iconSide, title, titleClass, subtitleClass } = props
  
  return (
    <Section className="section reviews">
      <div className="container">
        {title && <Heading className={titleClass} headingLevel="h2">
          {title}
        </Heading>}
        <div className="content">
          {reviews.map((item: ReviewItemProps) => (
            <article key={item.id}>
              <header>
                {iconSide === 'start' && icon}
                <h3 className={subtitleClass}>{item.name}</h3>
                <span>{item.jobTitle}</span>
                {iconSide === 'end' && icon}
              </header>
              <p className="t-quote">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
