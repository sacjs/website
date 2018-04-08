import dateFormat from 'dateformat'
import { formatAddress, ordinalize } from '../../utils/string'

export default function preamble (date, location, typeCounter) {
  return `SacJS will be hosting our ${ordinalize(
    typeCounter
  )} meetup on ${dateFormat(
    date,
    'dddd, mmmm dS'
  )} at ${location.name} on ${formatAddress(location.address)}`
}
