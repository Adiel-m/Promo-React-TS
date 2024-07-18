import '../styles/themes/empower.css'
import { Hero } from '../layouts/Hero'
import { Footer } from '../layouts/Footer'
import Main from '../layouts/Main'
import { Benefits } from '../layouts/Benefits'
import { Reviews } from '../layouts/Reviews'

const fetchData = async () => {
  const res = await fetch('/src/api/themes.json')
  const data = await res.json()

  return data.empower
}

const data = await fetchData()



export const Empower = () => {
  const { hero, benefits, reviews, footer } = data

  return (
    <>
      <Hero
        slot={{
          position: 'inColumnLast',
          children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
        }}
        title={hero.title}
        text={hero.text}
        btnText={hero.btnText}
      ></Hero>
      <Main>
        <Benefits titleClass="t-bg-clip grad-y" title={benefits.title} />
        <Reviews titleClass="t-bg-clip grad-y" title={reviews.title} />
      </Main>
      <Footer titleClass="t-bg-clip grad-y"  title={footer.title} btnText={footer.btnText} />
    </>
  )
}
