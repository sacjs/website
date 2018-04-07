import { absoluteUrl } from '../utils/urlFilters'
import { array, shape, string } from 'prop-types'
import dateFormat from 'dateformat'
import { formatAddress } from '../utils/string'
import organization from '../metadata/organization'
import React from 'react'
import stripHtml from 'string-strip-html'
import { toSentence } from '../utils/array'

function buildSpeakerList (schedule) {
  return schedule
    .reduce((set, item) => {
      if (item.type !== 'speaker') {
        return set
      }
      const speakerNames = toSentence(
        item.speakers.map(
          (speaker) => `${speaker.name} (${absoluteUrl(speaker.url)})`
        )
      )
      set.push(`* ${speakerNames} - ${item.title || 'Your talk here!'}`)
      return set
    }, [])
    .join('\n')
}

const MeetupDetailsTemplate = ({ data: { eventPage } }) => {
  const { frontmatter: { date, schedule }, html } = eventPage
  const location = eventPage.frontmatter.location || organization.location
  const speakers = buildSpeakerList(schedule)
  return (
    <pre>
      {`
SacJS will be hosting our 32nd meetup on ${dateFormat(
      date,
      'dddd, mmmm dS'
    )} at ${location.name} on ${formatAddress(location.address)}

${stripHtml(html)}

${speakers}

SacJS expects all speakers and attendees to follow our Code of Conduct (http://sacjs.com/code-of-conduct/).

Food and liquid refreshments will be provided by our sponsors.

Free parking at The Cannery will be pre-arranged courtesy of The Urban Hive.

If you would also like to sponsor or speak at one of our events, please contact us on GitHub, Twitter (@sac_js (https://twitter.com/sac_js)), #sacjs on the #SacTech Slack Team (http://sac-tech.herokuapp.com/), or Meetup.com.

NOTE: We will be at the *new* Urban Hive location so make sure you go to the right address!
`}
    </pre>
  )
}

MeetupDetailsTemplate.propTypes = {
  data: shape({
    eventPage: shape({
      frontmatter: shape({
        date: string,
        schedule: array
      }),
      html: string
    })
  })
}

export default MeetupDetailsTemplate

export const query = graphql`
  query MeetupDetailsQuery($eventSlug: String!) {
    eventPage: markdownRemark(fields: { slug: { eq: $eventSlug } }) {
      ...baseEvent
      frontmatter {
        date
        location {
          address {
            address1
            city
            state
            postal_code
          }
          name
          url
        }
      }
      html
    }
  }
`
