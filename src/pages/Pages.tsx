import { Outlet } from "react-router-dom"
import { Props } from "../ts/interfaces"

export const Pages = ({children}: Props) => {
  return (
    <>
      <div>Pages</div>
      <Outlet />
      {children}
    </>
  )
}