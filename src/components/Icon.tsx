import {  validateImageExtension } from '../ts/utils'
import { IconProps } from '../ts/interfaces/icon.interfaces'

export const Icon = ({ iconSize = 'sm', iconSrc, iconAlt = '' }: IconProps) => {
  validateImageExtension(iconSrc)

  return  <div className={`icon icon-${iconSize}`}><img src={iconSrc} alt={iconAlt} /></div>
}
