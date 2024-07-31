import Header from "./layouts/Header";
import { PageTheme } from "./themes/PageTheme";

export default function App() {
  return (
    <PageTheme pageTheme="home" theme="light">
      <Header>
        <h1>Press and Hold for 1 Second To View the Menu</h1>
      </Header>
    </PageTheme>
  )
}