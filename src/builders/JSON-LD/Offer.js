export default function Offer ({
  availability,
  category = 'primary',
  currency = 'USD',
  name,
  price,
  qty,
  url
}) {
  return {
    '@context': 'http://schema.org',
    '@type': 'Offer',
    availability: `http://schema.org/${availability}`,
    category,
    inventoryLevel: {
      '@type': 'QuantitativeValue',
      name: qty
    },
    name,
    price,
    priceCurrency: currency,
    url,
    validFrom: null
  }
}
