import './future.css'
import Main from '../../layouts/Main'
import { Footer } from '../../layouts/footer/Footer'
import { Hero } from '../../layouts/hero/Hero'
import { Benefits } from '../../layouts/benefits/Benefits'
import { Reviews } from '../../layouts/reviews/Reviews'
import { Theme } from '../../themes/Theme'

// Fetch Data
const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.future
}
const data = await fetchData()

export const Future = () => {
  const { hero, benefits, reviews, footer } = data

  return (
    <Theme themePage="future" theme="light">
      <Main>
      <Hero
        slot={{
          position: 'inSectionFirst',
          children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
        }}
        title={hero.title}
        text={hero.text}
        btnText={hero.btnText}
      />
        <Benefits title={benefits.title} />
        <Reviews title={reviews.title} />
      </Main>
      <Footer title={footer.title} btnText={footer.btnText} />
    </Theme>
  )
}
