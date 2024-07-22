import './nav.css'
import { NavLink } from "react-router-dom"
import { navigation } from "../navigation"

export const NavMenu = () => {
  return (
    <nav className="nav">
      <ul className="menu">
        {navigation.map((item) => (
          <li className="item" key={item.path}>
            {!item.children ? (
              <NavLink className="link" to={item.path}>
                {item.path === '/' ? 'home' : item.path}
              </NavLink>
            ) : (
              <ul className="sub-menu">
                {item.children.map((subItem, i) => (
                  <li
                    style={{ offsetDistance: `${(100 / item.children.length) * (i+1)}%` }}
                    className="sub-item"
                    key={subItem.path}
                  >
                    <NavLink className="sub-link" to={item.path + subItem.path}>
                      {subItem.path}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}