import './nav.css'
import { routes } from "../../routes"
import { LegacyRef, useContext } from 'react'
import { MenuContext } from './MenuContext'
import { MenuItem } from './MenuItem'

export const Nav = () => {
  const {
    menuIsVisible,
    listItemsRef,
    menuRef,
    menuPosition,
  } = useContext(MenuContext)

  return (
    <nav className="nav">
      <ul
        ref={menuRef as LegacyRef<HTMLUListElement> | undefined}
        className={`menu${menuIsVisible ? ' visible' : ''}`}
        style={{
          transform: `translateX(${menuPosition.x}px) translateY(${menuPosition.y}px)`,
        }}
      >
        {
          // Menu
          routes.map((item1, i) => (
            <MenuItem
              key={item1.path === '/' ? 'home' : item1.path}
              itemRef={(el: HTMLLIElement) => (listItemsRef.current[i] = el)}
              itemClass={'item'}
              style={{ offsetDistance: `${(100 / routes.length) * (i + 1)}%` }}
              linkLabel={item1.path === '/' ? 'home' : item1.path}
              linkClass={'link'}
              linkTo={item1.path}
            >
              {
                // Sub-Menu
                item1.children && (
                  <ul className="sub-menu">
                    {item1.children.map((item2, j) => (
                      <MenuItem
                        key={item2.path}
                        itemRef={(el: HTMLLIElement) =>
                          (listItemsRef.current[i + j + 1] = el)
                        }
                        itemClass={'sub-item circle-1'}
                        style={{
                          offsetDistance: `${(100 / item1.children.length) * (j + 1)}%`,
                        }}
                        linkLabel={item2.path}
                        linkClass={'sub-link'}
                        linkTo={item2.path}
                      >
                        {
                          // Sub-Menu
                          item2.children && (
                            <ul className="sub-menu">
                              {item2.children.map((item3, k) => (
                                <MenuItem
                                  key={item3.path}
                                  itemRef={(el: HTMLLIElement) =>
                                    (listItemsRef.current[i + j + k + 2] = el)
                                  }
                                  itemClass={'sub-item circle-2'}
                                  style={{
                                    offsetDistance: `${
                                      (100 / item2.children.length) * (k + 1)
                                    }%`,
                                  }}
                                  linkLabel={item3.path}
                                  linkClass={'sub-link'}
                                  linkTo={item2.path + '/' + item3.path}
                                ></MenuItem>
                              ))}
                            </ul>
                          )
                        }
                      </MenuItem>
                    ))}
                  </ul>
                )
              }
            </MenuItem>
          ))
        }
      </ul>
    </nav>
  )
}