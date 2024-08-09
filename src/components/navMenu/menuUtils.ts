import { StrNumObject } from "../../ts/types"
import { ListItemsRefType, MenuRefType } from "./menu.types"

/** Return BoundingClientRect  */
export const setRect = (el: HTMLElement | HTMLDivElement): DOMRect => {
  return el.getBoundingClientRect()
}

/** Convert BoundingClientRect to Object  */
export const toRectObject = (el: (HTMLElement | HTMLDivElement)): StrNumObject => {
  const rect = setRect(el) as unknown as StrNumObject
  const obj: StrNumObject = {}

  for (const key in rect) {
    const val = rect[key]
    obj[key] = Math.floor(val)
  }

  return obj
}

/** Convert BoundingClientRect Array to Objects Array */
export const toRectObjectArr = (refEl: ListItemsRefType): StrNumObject[] => {
  const elArr = { ...refEl }
  let arr: StrNumObject[] = []

  elArr.current.map((el) => {
    const newEl = toRectObject(el)
    return arr = [...arr, newEl]
  })

  return arr
}

/** Convert an ARRAY of boundary objects to a SINGLE boundary object  
 * Compare all values and find:  
 * * Lowest Negative Values (left, top)  
 * * Highest Positive Values (right, bottom, width, height, x, y)  
 * Return an Object entries */
export const toSingleRectObject = (elArr: StrNumObject[]): StrNumObject => {
  const obj: StrNumObject = {}

  elArr.map((el) => {
    for (const key in el) {
      const value = el[key]

      // set the highest value
      if (key === 'left' || key === 'top') {
        if (obj[key] === undefined || value <= obj[key]) {
          obj[key] = Math.floor(value)
        }
      } else {
        if (obj[key] === undefined || value >= obj[key]) {
          obj[key] = Math.floor(value)
        }
      }
    }
  })

  return obj
}

/** Return Necessary Rect object entries */
export const setNecessaryRectObject = (obj: StrNumObject | DOMRect): StrNumObject => {
  return {
    left: obj.left,
    top: obj.top,
    right: obj.right,
    bottom: obj.bottom,
    width: obj.width,
    height: obj.height,
  }
}

/** Return an Array of Necessary Rect objects entries */
export const setNecessaryRectObjectArray = (objArr: (StrNumObject | DOMRect)[]): StrNumObject[] => {
  let arr: StrNumObject[] = []
  
  objArr.map(obj =>{
    const objBoundaries = setNecessaryRectObject(obj)
    arr = [...arr, objBoundaries]})
  return arr
}

/** Return a Remainder between an outer Rect Entries and an inner Rect Entries    */
export const axisLimitRemainder = (outer: StrNumObject, inner: StrNumObject) => {
  const obj: StrNumObject = {}

  for (const outKey in outer) {
    for (const inKey in inner) {
      if (outKey === inKey) {
        if (outKey === 'left') { 
          obj[outKey] = Math.abs(inner[inKey] - outer[outKey] - outer.width)
        } 
        if (outKey === 'top') {
          obj[outKey] = Math.abs(inner[inKey] - outer[outKey] - outer.height)
        } 
        if (outKey === 'right') {
          obj[outKey] = Math.abs(outer[outKey] - inner[inKey] + outer.width)
        }
        if (outKey === 'bottom') {
          obj[outKey] = Math.abs(outer[outKey] - inner['top'] + outer.height)
        }
      }
    }
  }

  return obj
}

/** Limit the menu from passing min/max axis points */
export const menuAxisLimit = (currentPos: { x: number; y: number }, limit: StrNumObject) => {
  const body = document.querySelector('body')!
  const html = document.documentElement
  const page: StrNumObject = {
    width: window.innerWidth,
    height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    ),
  }

  const newPos: StrNumObject = {
    x: currentPos.x,
    y: currentPos.y,
  }

  for (const posKey in currentPos) {
    for (const limKey in limit) {
      // X Axis
      if (posKey === 'x') {
        // Min X position
        const minX = limit[limKey]
        if (limKey === 'left' && currentPos[posKey] < minX) {
          newPos.x = minX
        }
        // Max X position
        const maxX = page.width - limit[limKey]
        if (limKey === 'right' && currentPos[posKey] > maxX) {
          newPos.x = maxX
        }
      }
      // Y Axis
      if (posKey === 'y') {
        // Min Y position
        const minY = limit[limKey]
        if (limKey === 'top' && currentPos[posKey] < minY) {
          newPos.y = minY
        }
        
        // Max Y position
        const maxY = page.height - limit[limKey]
        if (limKey === 'bottom' && currentPos[posKey] > maxY) {
          newPos.y = maxY
        }
      }
    }
  }
  return newPos
}

/** Initiate Axis Limits */
export const axisLimitInit = (menuRef: MenuRefType, listItemsRef: ListItemsRefType) => {
  const menuRect = setNecessaryRectObject(toRectObject(menuRef.current!))
  const itemsRect = toSingleRectObject(
    setNecessaryRectObjectArray(toRectObjectArr(listItemsRef)),
  )

  return axisLimitRemainder(itemsRect, menuRect)
}

/** Return a BoundingClientRect Array  */
// export const setRectArr = (elArr: (HTMLElement | HTMLDivElement)[]): DOMRect[] => {
//   let arr: DOMRect[] = []
//   elArr.map((el) => arr = [...arr, setRect(el)])

//   return arr
// }

/** Compare if entries sides are over the boundary    
 * Return out-of-boundary object entries  */
// export const outOfBoundaryEntries = (obj: StrNumObject, boundary: StrNumObject): StrNumObject => {
//   const newObj: StrNumObject = {}

//   if (obj.left < boundary.left) {
//     newObj.left = obj.left
//   }
//   if (obj.top < boundary.top) {
//     newObj.top = obj.top
//   }
//   if (obj.right > boundary.right) {
//     newObj.right = obj.right
//   }
//   if (obj.bottom > boundary.bottom) {
//     newObj.bottom = obj.bottom
//   }

//   return newObj
// }

/** Iterate over an Array of objects  
 * Compare if entries sides are over the boundary  
 * Return an Array of All out-of-boundary objects entries */
// export const outOfBoundaryEntriesObjectsArr = (
//   refEl: ListItemsRefType,
//   boundary: StrNumObject,
// ) => {
//   const elArr = toRectObjectArr(refEl)
//   let arr: StrNumObject[] = []

//   elArr.map((el) => {
//     const newEl = outOfBoundaryEntries(el, boundary)

//     if (isTrue(newEl)) {
//       arr = [...arr, newEl]
//     }
//   })

//   return arr
// }

/** Return the remainder between the object and Screen boundary */
// export const outScreenRemainder = (obj: StrNumObject, boundary: StrNumObject) => {
//   const newObj: StrNumObject = {}

//   for (const entry in obj) {
//     for (const key in boundary) {
//       if (entry === key) {
//         if (entry === 'left' || entry === 'top') {
//           newObj[entry] = Math.abs(obj[entry])
//         } else {
//           newObj[entry] = obj[entry] - boundary[key]
//         }
//       }
//     }
//   } 
  
//   return newObj
// }

/** Shift the object to new coordinates by the remainder  
 * Return object coordinates entries */
// export const deflectByRemainder = (obj: StrNumObject, reminder: StrNumObject) => {
//   const newObj: {x: number, y: number} = {x: obj.x, y: obj.y} 
//   Object.keys(reminder).map(entry => {
//     if (entry === 'left') {
//       newObj.x = obj.x + reminder[entry]
//     }
//     if (entry === 'top') {
//       newObj.x = obj.y + reminder[entry]
//     }
//     if (entry === 'right') {
//       newObj.x = obj.x - reminder[entry] - 32 // 32 fix overflow issue
//     }
//     if (entry === 'bottom') {
//       newObj.y = obj.y - reminder[entry]
//     }
//   })
//   return newObj
// }

/** Return the first menu base position  */
// export const menuBasePosition = (el: HTMLUListElement, scroll: StrNumObject) => {
//   const menuRect = toRectObject(el)

//   return {
//     x: Math.floor(menuRect.x + scroll.x),
//     y: Math.floor(menuRect.y + scroll.y),
//   }
// }