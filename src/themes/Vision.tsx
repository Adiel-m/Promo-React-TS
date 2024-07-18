import '../styles/themes/vision.css'
import { Hero } from '../layouts/Hero'
import { Footer } from '../layouts/Footer'
import Main from '../layouts/Main'
import { Benefits } from '../layouts/Benefits'
import { Reviews } from '../layouts/Reviews'

const fetchData = async () => {
  const res = await fetch('/src/api/themes.json')
  const data = await res.json()

  return data.vision
}

const data = await fetchData()

export const Vision = () => {
  const {  hero, benefits, reviews, footer } = data

  return (
    <>
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
          subtitleClass='t-bg-clip grad-y'
        />
      </Main>
      <Footer
        title={footer.title}
        btnText={footer.btnText}
        titleClass="t-bg-clip grad-x"
      />
    </>
  )
}
