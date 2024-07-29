import { Nav } from "../components/navMenu/Nav"
import { Props } from "../ts/interfaces"

export default function PageHeader({ children }: Props) {
  return <header>
    <Nav />
    {children}</header>
}