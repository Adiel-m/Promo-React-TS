import './nav.css'
import { NavLink } from "react-router-dom"
import { navigation } from "../navigation"

export const NavMenu = () => {
  return (
    <nav className="nav">
      <ul className="menu">
        {
          // Menu
          navigation.map((item, i) => (
            <li
              className="item"
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
                    {item.children.map((subItem, i) => (
                      <li
                        className="sub-item"
                        key={subItem.path}
                        style={{ offsetDistance: `${(100 / item.children.length) * (i + 1)}%`}}
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