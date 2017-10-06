import { absoluteUrl } from '../../utils/urlFilters'
import ListItem from './ListItem'
import Thing from './Thing'

export default function BreadcrumbListBuilder (breadcrumbs) {
  const list = breadcrumbs.map((item, position) =>
    ListItem({
      item: Thing({
        '@id': absoluteUrl(item.url),
        name: item.name
      }),
      position: position + 1
    })
  )
  return {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list,
    numberOfItems: list.length
  }
}
