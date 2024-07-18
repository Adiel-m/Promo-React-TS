import { IconSize } from "../types/icon.types"

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement | SVGAElement> {
  iconSrc: string
  iconAlt: string
  iconSize?: IconSize
}
