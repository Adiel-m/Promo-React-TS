import './nav.css'
import { NavLink } from "react-router-dom"
import { navigation } from "../navigation"
import { useContext } from 'react'
import { MenuContext } from './MenuContext'
export const NavMenu = () => {
  
  const {
    menuIsVisible,
    subMenuIsVisible,
    listItemsRef,
    handleHoverOver,
    handleHoverLeave,
  } = useContext(MenuContext)

  return (
    <nav className="nav">
      <ul className={`menu${menuIsVisible ? ' visible' : ''}`}>
        {
          // Menu
          navigation.map((item, i) => (
            <li
              ref={(el) => (listItemsRef.current[i] = el)}
              onMouseOver={(e) => {
                handleHoverOver(e)
              }}
              onMouseLeave={(e) => {
                handleHoverLeave(e)
              }}
              className={`item${item.children && subMenuIsVisible ? ' visible' : ''}`}
              key={item.path}
              style={{ offsetDistance: `${(100 / navigation.length) * (i + 1)}%` }}
            >
              <NavLink className="link" to={item.path}>
                {item.path === '/' ? 'home' : item.path}
              </NavLink>
              {
                // Sub-Menu
                item.children && (
                  <ul className="sub-menu">
                    {item.children.map((subItem, j) => (
                      <li
                        ref={(el) => (listItemsRef.current[(i * 10) + j] = el)}
                        onMouseLeave={(e) => {
                          handleHoverLeave(e)
                        }}
                        onMouseOver={(e) => {
                          handleHoverOver(e)
                        }}
                        className="sub-item"
                        key={subItem.path}
                        style={{
                          offsetDistance: `${(100 / item.children.length) * (j + 1)}%`,
                        }}
                      >
                        <NavLink className="sub-link" to={item.path + subItem.path}>
                          {subItem.path}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )
              }
            </li>
          ))
        }
      </ul>
    </nav>
  )
}