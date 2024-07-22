import { NavLink } from "react-router-dom"
import { navigation } from "../navigation"

export const NavMenu = () => {
  return (
    <nav className="nav">
      <ul>
        {navigation.map((item) => (
          <li key={item.path}>
            {!item.children ? (
              <NavLink className="nav--link" to={item.path}>
                {item.path === '/' ? 'home' : item.path}
              </NavLink>
            ) : (
              <ul>
                {item.children.map((subItem) => (
                  <li key={subItem.path}>
                    <NavLink
                      className="nav--link"
                      to={item.path + subItem.path}
                    >
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