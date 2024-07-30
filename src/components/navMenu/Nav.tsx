import './nav.css'
import { NavLink } from "react-router-dom"
import { routes } from "../../routes"
import { useContext } from 'react'
import { MenuContext } from './MenuContext'

export const Nav = () => {
  const {
    menuIsVisible,
    subMenuIsVisible,
    listItemsRef,
    menuRef,
    menuPosition,
    handleHoverOver,
    handleHoverLeave,
  } = useContext(MenuContext)

  return (
    <nav className="nav">
      <ul
        ref={menuRef}
        className={`menu${menuIsVisible ? ' visible' : ''}`}
        style={{
          transform: `translateX(${menuPosition.x}px) translateY(${menuPosition.y}px)`,
        }}
      >
        {
          // Menu
          routes.map((item, i) => (
            <li
              ref={(el) => (listItemsRef.current[i] = el)}
              onMouseOver={(e) => {
                handleHoverOver(e)
              }}
              onMouseLeave={(e) => {
                handleHoverLeave(e)
              }}
              className="item"
              key={item.path}
              style={{ offsetDistance: `${(100 / routes.length) * (i + 1)}%` }}
            >
              <NavLink className="link" to={item.path}>
                {item.path === '/' ? 'home' : item.path}
              </NavLink>
              {
                // Sub-Menu
                item.children && (
                  <ul className={`sub-menu${subMenuIsVisible ? ' visible' : ''}`}>
                    {item.children.map((subItem, j) => (
                      <li
                        ref={(el) => (listItemsRef.current[i * 10 + j] = el)}
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
                        <NavLink
                          className="sub-link"
                          to={item.path + '/' + subItem.path}
                        >
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