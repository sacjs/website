/* eslint-disable camelcase */
export function formatAddress ({
  address1,
  address2,
  city,
  postal_code,
  state
}) {
  const address = `${address1} ${address2 || ''}`.trim()
  return `${address}, ${city}, ${postal_code}, ${state}`
}
/* eslint-enable camelcase */
