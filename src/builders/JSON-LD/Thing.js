export default function ThingBuilder (props) {
  return Object.assign({}, props, {
    '@context': 'http://schema.org',
    '@type': 'Thing'
  })
}
