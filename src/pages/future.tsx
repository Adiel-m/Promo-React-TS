import '../styles/pages/future.css'
import { Hero } from '../layouts/Hero'
import { Footer } from '../layouts/Footer'
import Main from '../layouts/Main'
import { Benefits } from '../layouts/Benefits'
import { Reviews } from '../layouts/Reviews'
import { addPageTheme } from '../ts/utils'

const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.future
}

const data = await fetchData()

export const Future = () => {
  addPageTheme('future')

  const { hero, benefits, reviews, footer } = data

  return (
    <>
      <Hero
        slot={{
          position: 'inSectionFirst',
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
