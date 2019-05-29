import { array, number, shape, string } from 'prop-types'
import MeetupDetails from '../components/MeetupDetails'
import organization from '../metadata/organization'
import React from 'react'

const MeetupDetailsTemplate = ({
  data: { eventPage },
  pathContext: { typeCounter },
  ...props
}) => {
  const {
    frontmatter: { date, schedule },
    html
  } = eventPage
  const location = eventPage.frontmatter.location || organization.location
  return (
    <MeetupDetails
      date={date}
      location={location}
      schedule={schedule}
      typeCounter={typeCounter}
    >
      {html}
    </MeetupDetails>
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
  }),
  pathContext: shape({
    typeCounter: number.isRequired
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
