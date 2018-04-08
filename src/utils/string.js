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

const ORDINAL_SUBSTRINGS = ['th', 'st', 'nd', 'rd']
export function ordinalize (arg) {
  const n = parseInt(arg, 0)
  if (isNaN(n) || n < 0) return ''
  const v = n % 100
  return (
    n +
    (ORDINAL_SUBSTRINGS[(v - 20) % 10] ||
      ORDINAL_SUBSTRINGS[v] ||
      ORDINAL_SUBSTRINGS[0])
  )
}
