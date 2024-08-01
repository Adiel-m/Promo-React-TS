import { NavLink, To } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "./MenuContext"

interface MenuItemProps {
  itemRef: React.LegacyRef<HTMLLIElement> | undefined
  itemClass: string
  style: React.CSSProperties | undefined
  linkLabel: string
  linkClass: string
  linkTo: To
  children?: JSX.Element
}


export const MenuItem = ({
  itemRef,
  itemClass,
  style,
  linkLabel,
  linkClass,
  linkTo,
  children,
}: MenuItemProps) => {
  const { handleHoverLeave, handleHoverOver } = useContext(MenuContext)

  return (
    <li
      ref={itemRef}
      onMouseOver={(e) => {
        handleHoverOver(e)
      }}
      onMouseLeave={(e) => {
        handleHoverLeave(e)
      }}
      className={itemClass}
      style={style}
    >
      {children}
      <NavLink className={linkClass} to={linkTo}>
        {linkLabel}
      </NavLink>
    </li>
  )
}