import { ReactNode } from "react"

interface Main {
  children: ReactNode
}

export default function Main({ children }: Main) {
  return <main>{children}</main>
}