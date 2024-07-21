import '../styles/pages/socket.css'
import { Hero } from '../layouts/Hero'
import { Footer } from '../layouts/Footer'
import Main from '../layouts/Main'
import { Benefits } from '../layouts/Benefits'
import { Reviews } from '../layouts/Reviews'
import { addPageTheme } from '../ts/utils'

const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.socket
}

const data = await fetchData()

export const Socket = () => {
  addPageTheme('socket')

  const { hero, benefits, reviews, footer } = data

  return (
    <>
      <Hero title={hero.title} text={hero.text} btnText={hero.btnText}></Hero>
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
    </>
  )
}
