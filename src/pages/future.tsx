import './future.css'
import PageHeader from '../layouts/PageHeader'
import Main from '../layouts/Main'
import { Footer } from '../layouts/footer/Footer'
import { Hero } from '../layouts/hero/Hero'
import { Benefits } from '../layouts/benefits/Benefits'
import { Reviews } from '../layouts/reviews/Reviews'

const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.future
}

const data = await fetchData()

export const Future = () => {

  const { hero, benefits, reviews, footer } = data

  return (
    <>
      <PageHeader>
        <Hero
          slot={{
            position: 'inSectionFirst',
            children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
          }}
          title={hero.title}
          text={hero.text}
          btnText={hero.btnText}
        ></Hero>
      </PageHeader>
      <Main>
        <Benefits title={benefits.title} />
        <Reviews title={reviews.title} />
      </Main>
      <Footer title={footer.title} btnText={footer.btnText} />
    </>
  )
}
