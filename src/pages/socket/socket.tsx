import './socket.css'
import Header from '../../layouts/Header'
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

  return data.socket
}
const data = await fetchData()

export const Socket = () => {
  const { hero, benefits, reviews, footer } = data

  return (
    <Theme themePage="socket" theme="dark">
      <Header>
        <Hero title={hero.title} text={hero.text} btnText={hero.btnText}></Hero>
      </Header>
      <Main>
        <Benefits
          title={benefits.title}
          titleClass="t-bg-clip grad-y"
          cardTitleClass="t-bg-clip grad-y"
        />
        <Reviews
          title={reviews.title}
          titleClass="t-bg-clip grad-y"
          subtitleClass="t-bg-clip grad-y"
        />
      </Main>
      <Footer
        titleClass="t-bg-clip grad-y"
        title={footer.title}
        btnText={footer.btnText}
      />
    </Theme>
  )
}
