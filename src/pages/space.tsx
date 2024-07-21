import '../styles/pages/space.css'
import { Hero } from '../layouts/Hero'
import { Footer } from '../layouts/Footer'
import Main from '../layouts/Main'
import { Benefits } from '../layouts/Benefits'
import { Reviews } from '../layouts/Reviews'
import { Icon } from '../components/Icon'
import { addPageTheme } from '../ts/utils'

const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.space
}

const data = await fetchData()

export const Space = () => {
  addPageTheme('space')

  const { page, hero, benefits, reviews, footer } = data

  return (
      <>
        <div className="bg-img">
          <img className="img" src={page.imgSrc} alt={page.imgAlt}></img>
        </div>
        <Hero
          slot={{
            position: 'inContainerFirst',
            children: <img src={hero.imgSrc} alt={hero.imgAlt} />,
          }}
          title={hero.title}
          text={hero.text}
          btnText={hero.btnText}
        ></Hero>
        <Main>
          <Benefits
            title={benefits.title}
            titleClass="t-bg-clip grad-y"
            cardTitleClass="t-bg-clip grad-y"
            icon={
              <Icon
                iconSize={benefits.iconSize}
                iconSrc={benefits.iconSrc}
                iconAlt={benefits.iconAlt}
              />
            }
            iconSide="start"
          />
          <Reviews
            title={reviews.title}
            titleClass="t-bg-clip grad-y"
            subtitleClass="t-bg-clip grad-y"
            icon={
              <Icon
                iconSize={reviews.iconSize}
                iconSrc={reviews.iconSrc}
                iconAlt={reviews.iconAlt}
              />
            }
            iconSide="start"
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
