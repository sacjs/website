import { absoluteUrl } from '../../utils/urlFilters'

export default function Organization ({
  address,
  email,
  logo,
  pointOfContact,
  name,
  sameAs,
  url
}) {
  const org = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    email,
    name,
    url
  }
  if (address) {
    Object.assign(org, {
      address: {
        '@type': 'PostalAddress',
        addressCountry: address.country,
        addressLocality: address.city,
        addressRegion: address.state
      }
    })
  }
  if (pointOfContact) {
    Object.assign(org, {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: pointOfContact.email,
        url: pointOfContact.url
      },
      email: org.email || pointOfContact.email,
      url: org.url || pointOfContact.url
    })
  }
  if (logo) {
    Object.assign(org, {
      // logo: {
      //   '@context': 'http://www.schema.org',
      //   '@type': 'ImageObject',
      //   height: logo.height,
      //   url: absoluteUrl(logo.url),
      //   width: logo.width
      // }
    })
  }
  if (sameAs) {
    Object.assign(org, {
      sameAs
    })
  }
  return org
}
