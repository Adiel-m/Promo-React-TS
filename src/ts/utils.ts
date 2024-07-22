import { PageThemeProps } from "./interfaces/common.interfaces"

export const isObj = <T>(arg: T): boolean => {
  return (
    typeof arg === 'object' &&
    // exclude Array because array is type of object
    !Array.isArray(arg) &&
    // exclude Null because null is type of object
    arg !== null
  )
}

export const isTrue = <T>(arg: T): boolean => {
  // check if Array is empty and set to false
  if (Array.isArray(arg) && !arg.length) {
    return false
  }
  // check if Object is empty and set to false
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return false
  }
  return !!arg
}

export const validateImageExtension = (file: string):  boolean => {
  const allowedExtension = [
    '.png',
    '.avif',
    '.gif',
    '.jpg',
    '.jpeg',
    '.svg',
    '.webp',
  ]
  const ext = getExtension(file)
  return allowedExtension.indexOf(ext) !== -1
    ? true
    : createErr(`File is not a valid image type. \n File: ${file}`)
}

export const createErr = (errMsg: string) => {
    throw new Error(errMsg);
};

export const getExtension = (file: string): string => {
  const ext = file.slice(file.lastIndexOf('.'))
  return ext ? ext : 'File Extension is Missing'
}

export const pageAndThemeModeStyles = ({ page, pageThemeMode }: PageThemeProps) => {
  const body = document.querySelector('body')!
  pageThemeMode === 'dark'
    ? body.classList.add(page, pageThemeMode)
    : body.classList.add(page)
}