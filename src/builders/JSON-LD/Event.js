import { absoluteUrl } from '../../utils/urlFilters'
import { toLocalISOString } from '../../utils/date'
import Offer from './Offer'
import Person from './Person'
import Place from './Place'

export default function EventBuilder ({
  creativeWorks,
  description,
  doorTime,
  endDate,
  eventStatus,
  image,
  location,
  meetup,
  name,
  performers,
  startDate,
  url
}) {
  const event = {
    '@context': 'http://www.schema.org',
    '@type': 'Event',
    description,
    doorTime: toLocalISOString(doorTime),
    endDate: toLocalISOString(endDate),
    eventStatus,
    image: absoluteUrl(image),
    name,
    startDate: toLocalISOString(startDate),
    url: absoluteUrl(url)
  }
  if (location) {
    Object.assign(event, {
      location: Place(location)
    })
  }
  if (meetup) {
    Object.assign(event, {
      offers: Offer({
        availability: 'InStock',
        name: 'General Admission',
        price: '0.00',
        qty: 100,
        url: `http://www.meetup.com/The-Sacramento-Javascript-Meetup/events/${meetup.id}`
      })
    })
  }
  if (performers) {
    Object.assign(event, {
      performers: performers.map(Person)
    })
  }
  return event
}
