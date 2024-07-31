import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import { Theme } from "./themes/Theme";

export default function App() {
  return (
    <Theme themePage="home" theme="light">
      <Header>
        <h1>Press and Hold for 1 Second To View the Menu</h1>
      </Header>
      <Outlet />
    </Theme>
  )
}