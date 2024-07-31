import './vision.css'
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

  return data.vision
}
const data = await fetchData()

export const Vision = () => {
  const { hero, benefits, reviews, footer } = data

  return (
    <Theme themePage="vision" theme="dark">
      <Hero
        slot={{
          position: 'inColumnLast',
          children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
        }}
        title={hero.title}
        titleClass="t-bg-clip grad-x"
        text={hero.text}
        btnText={hero.btnText}
      ></Hero>
      <Main>
        <Benefits
          title={benefits.title}
          titleClass="t-bg-clip grad-x"
          cardTitleClass="t-bg-clip grad-y"
        />
        <Reviews
          title={reviews.title}
          titleClass="t-bg-clip grad-x"
          subtitleClass="t-bg-clip grad-y"
        />
      </Main>
      <Footer
        title={footer.title}
        btnText={footer.btnText}
        titleClass="t-bg-clip grad-x"
      />
    </Theme>
  )
}
