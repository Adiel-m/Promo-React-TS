import { HeadingLevel } from "../types/heading.types";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: HeadingLevel
}
