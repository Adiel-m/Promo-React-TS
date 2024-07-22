import { HeadingLevel } from "./heading.types";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: HeadingLevel
}
