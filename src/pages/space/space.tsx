import './space.css'
import Main from '../../layouts/Main'
import { Footer } from '../../layouts/footer/Footer'
import { Hero } from '../../layouts/hero/Hero'
import { Benefits } from '../../layouts/benefits/Benefits'
import { Reviews } from '../../layouts/reviews/Reviews'
import { Icon } from '../../components/icon/Icon'

// Fetch Data
const fetchData = async () => {
  const res = await fetch('/src/api/pages.json')
  const data = await res.json()

  return data.space
}
const data = await fetchData()

export const Space = () => {
  const { page, hero, benefits, reviews, footer } = data

  return (
    <div className="space">
      <Main>
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
        />
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
    </div>
  )
}
