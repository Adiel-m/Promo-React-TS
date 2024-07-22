import './elevate.css'
import { Hero } from '../layouts/hero/Hero'
import { Footer } from '../layouts/footer/Footer'
import Main from '../layouts/Main'
import { Benefits } from '../layouts/benefits/Benefits'
import { Reviews } from '../layouts/reviews/Reviews'


const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.elevate
}

const data = await fetchData()

export const Elevate = () => {

  const { hero, benefits, reviews, footer } = data
  return (
    <>
      <Hero
        slot={{
          position: 'inContainerLast',
          children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
        }}
        title={hero.title}
        text={hero.text}
        btnText={hero.btnText}
      ></Hero>
      <Main>
        <Benefits title={benefits.title} />
        <Reviews title={reviews.title} />
      </Main>
      <Footer title={footer.title} btnText={footer.btnText} />
    </>
  )
}
