import { getDuration } from '../utils/date'
import { toSentence } from '../utils/array'

function generateDescription (performers) {
  if (!performers.length) {
    return 'TODO'
  }
  const names = performers.map((p) => p.name)
  return `Featuring amazing Javascript-related talks from ${toSentence(names)}`
}

export function eventLDFromContent (event, organization, site) {
  const { frontmatter: { date, location, meetup, schedule } } = event
  const { doorTime, endDate } = getDuration(date, schedule)
  const works = schedule.filter(
    (segment) => segment.type === 'speaker' && segment.title
  )
  const performers = works
    .reduce((speakerSet, work) => speakerSet.concat(work.speakers), [])
    .filter((speaker, index, set) => set.indexOf(speaker.url || speaker.name))
  return {
    description: generateDescription(performers),
    doorTime,
    endDate,
    eventStatus: 'http://schema.org/EventScheduled',
    image: organization.logo.url,
    location,
    meetup,
    name: `SacJS: ${event.title}`,
    performers,
    startDate: date,
    url: event.fields.relativePath
  }
}

export function eventFromContent (event, organization) {
  if (!event) {
    return null
  }
  return Object.assign({}, event, {
    frontmatter: Object.assign({}, event.frontmatter, {
      date: new Date(event.frontmatter.date),
      location: event.frontmatter.location || organization.location
    })
  })
}
