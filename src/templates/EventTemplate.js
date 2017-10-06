import DefaultLayout from '../layouts/DefaultLayout'
import Event from '../components/Event'
import { eventFromContent, eventLDFromContent } from '../transforms/Event'
import { object, shape, string } from 'prop-types'
import { organization } from '../metadata'
import Metadata from '../components/Metadata'
import React from 'react'

const EventTemplate = ({
  data: { eventPage, nextNextEventPage, nextEventPage, prevEventPage },
  pageResources: { page: { path } }
}) => {
  const event = eventFromContent(eventPage, organization)
  const nextEvent = eventFromContent(nextEventPage, organization)
  const nextNextEvent = eventFromContent(nextNextEventPage, organization)
  const prevEvent = eventFromContent(prevEventPage, organization)
  const events = [event, nextEvent, nextNextEvent]
    .filter((ev) => ev) // compact
    .map((ev) => eventLDFromContent(ev, organization)) // transform
  return (
    <DefaultLayout path={path}>
      <Metadata.Calendar eventsLD={events}/>
      <Event event={event} nextEvent={nextEvent} prevEvent={prevEvent}/>
    </DefaultLayout>
  )
}

EventTemplate.propTypes = {
  data: shape({
    eventPage: object,
    nextEventPage: object,
    nextNextEventPage: object,
    prevEventPage: object
  }),
  pageResources: shape({
    page: shape({
      path: string
    })
  })
}

export default EventTemplate

export const query = graphql`
  query EventQuery(
    $hasNextNextSlug: Boolean!
    $hasNextSlug: Boolean!
    $hasPrevSlug: Boolean!
    $nextNextSlug: String
    $nextSlug: String
    $prevSlug: String
    $slug: String!
  ) {
    eventPage: markdownRemark(fields: { slug: { eq: $slug } }) {
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
    nextNextEventPage: markdownRemark(fields: { slug: { eq: $nextNextSlug } })
      @include(if: $hasNextNextSlug) {
      ...baseEvent
    }
    nextEventPage: markdownRemark(fields: { slug: { eq: $nextSlug } })
      @include(if: $hasNextSlug) {
      ...baseEvent
    }
    prevEventPage: markdownRemark(fields: { slug: { eq: $prevSlug } })
      @include(if: $hasPrevSlug) {
      ...baseEvent
    }
  }

  fragment eventLink on MarkdownRemark {
    fields {
      path
    }
    frontmatter {
      date
      location {
        name
        url
      }
      title
    }
  }

  fragment meetup on MarkdownRemark {
    frontmatter {
      meetup {
        id
      }
    }
  }

  fragment schedule on MarkdownRemark {
    frontmatter {
      schedule {
        duration
        offset
        type
        title
        description
        speakers {
          name
          url
        }
        sponsors {
          name
          url
        }
      }
    }
  }

  fragment baseEvent on MarkdownRemark {
    ...eventLink
    ...meetup
    ...schedule
  }
`
