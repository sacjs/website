export default function Person ({ name, url }) {
  return {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name,
    sameAs: [url]
  }
}
