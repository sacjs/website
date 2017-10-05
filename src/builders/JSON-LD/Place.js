export default function Location ({ address = {}, name, url }) {
  return {
    '@context': 'http://schema.org',
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: {
        '@type': 'Country',
        name: address.country || 'USA'
      },
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postal_code,
      streetAddress: address.address1
    },
    name,
    sameAs: [url]
  }
}
