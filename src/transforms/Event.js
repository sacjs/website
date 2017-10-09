import { getDuration } from '../utils/date'
import { toSentence } from '../utils/array'

const BEERJS = /beer_js/
const BEERJS_PREAMBLE =
  'Enjoy some tasty beverages and have a friendly chat about Javascript, the web, and technology!'
const COFFEEJS = /coffee_js/
const COFFEEJS_PREAMBLE =
  'Enjoy a warm, roasty beverage and have a friendly chat about Javascript, the web, and technology!'
const DEFAULT_TITLE = 'Monthly Meetup'
const LEARNING_PREAMBLE = 'Learn more about the amazing world of Javascript'
const MEETUP = /monthly-meetup/
const MEETUP_PREAMBLE = 'Featuring amazing Javascript-related talks'

function generateDescription (performers, slug) {
  if (!performers.length) {
    if (slug.match(BEERJS)) {
      return BEERJS_PREAMBLE
    }
    if (slug.match(COFFEEJS)) {
      return COFFEEJS_PREAMBLE
    }
    if (slug.match(MEETUP)) {
      return MEETUP_PREAMBLE
    }
    return LEARNING_PREAMBLE
  }
  const names = performers.map((p) => p.name)
  return `${MEETUP_PREAMBLE} from ${toSentence(names)}`
}

export function eventLDFromContent (event, organization, site) {
  const {
    fields: { slug },
    frontmatter: { date, location, meetup, schedule }
  } = event
  const { doorTime, endDate } = getDuration(date, schedule)
  const works = schedule.filter(
    (segment) => segment.type === 'speaker' && segment.title
  )
  const performers = works
    .reduce((speakerSet, work) => speakerSet.concat(work.speakers), [])
    .filter((speaker, index, set) => set.indexOf(speaker.url || speaker.name))
  return {
    description: generateDescription(performers, slug),
    doorTime,
    endDate,
    eventStatus: 'http://schema.org/EventScheduled',
    image: organization.logo.url,
    location,
    meetup,
    name: `SacJS: ${event.title}`,
    performers,
    startDate: date,
    url: slug
  }
}

export function eventFromContent (event, organization) {
  if (!event) {
    return null
  }
  const { frontmatter: { date, location, title } } = event
  return Object.assign({}, event, {
    frontmatter: Object.assign({}, event.frontmatter, {
      date: new Date(date),
      location: location || organization.location,
      title: title || DEFAULT_TITLE
    })
  })
}
