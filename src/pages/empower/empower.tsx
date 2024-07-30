import './empower.css'
import PageHeader from '../../layouts/PageHeader'
import Main from '../../layouts/Main'
import { Footer } from '../../layouts/footer/Footer'
import { Hero } from '../../layouts/hero/Hero'
import { Benefits } from '../../layouts/benefits/Benefits'
import { Reviews } from '../../layouts/reviews/Reviews'
import { PageTheme } from '../../themes/PageTheme'

// Fetch Data
const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.empower
}
const data = await fetchData()

export const Empower = () => {
  const { hero, benefits, reviews, footer } = data

  return (
    <PageTheme pageTheme="empower" theme="light">
      <PageHeader>
        <Hero
          slot={{
            position: 'inColumnLast',
            children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
          }}
          title={hero.title}
          text={hero.text}
          btnText={hero.btnText}
        ></Hero>
      </PageHeader>
      <Main>
        <Benefits titleClass="t-bg-clip grad-y" title={benefits.title} />
        <Reviews titleClass="t-bg-clip grad-y" title={reviews.title} />
      </Main>
      <Footer
        titleClass="t-bg-clip grad-y"
        title={footer.title}
        btnText={footer.btnText}
      />
    </PageTheme>
  )
}
