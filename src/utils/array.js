import { Children, isValidElement } from 'react'

function toSentenceJSX (items) {
  items = Children.toArray(items)
  if (items.length === 2) {
    items.splice(1, 0, ' and ')
    return items
  }
  const lastItem = items.pop()
  const set = items.reduce(
    (sentence, item) => sentence.concat([item, ', ']),
    []
  )
  return set.concat([' and ', lastItem])
}

export function toSentence (items) {
  if (items.length < 2) {
    return items
  }
  if (isValidElement(items[0])) {
    return toSentenceJSX(items)
  }
  if (items.length === 2) {
    return items.join(' and ')
  }
  items = items.slice()
  const lastItem = items.pop()
  return `${items.join(', ')} and ${lastItem}`
}
