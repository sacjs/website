import DefaultLayout from '../layouts/DefaultLayout'
import Event from '../components/Event'
import { eventFromContent, eventLDFromContent } from '../transforms/Event'
import { object, shape, string } from 'prop-types'
import { organization } from '../metadata'
import Metadata from '../components/Metadata'
import React from 'react'

export default class EventTemplate extends React.Component {
  static childContextTypes = {
    hostname: string,
    port: string
  }
  static propTypes = {
    data: shape({
      eventPage: shape({
        fields: shape({
          relativePath: string
        })
      }),
      nextEventPage: object,
      nextNextEventPage: object,
      prevEventPage: object,
      site: shape({
        host: string,
        port: string
      })
    })
  }
  getChildContext () {
    const { data: { site: { host: hostname, port } } } = this.props
    return {
      hostname,
      port
    }
  }
  render () {
    const {
      data: { eventPage, nextNextEventPage, nextEventPage, prevEventPage }
    } = this.props
    const event = eventFromContent(eventPage, organization)
    const nextEvent = eventFromContent(nextEventPage, organization)
    const nextNextEvent = eventFromContent(nextNextEventPage, organization)
    const prevEvent = eventFromContent(prevEventPage, organization)
    const { fields: { relativePath } } = event
    const events = [event, nextEvent, nextNextEvent]
      .filter((ev) => ev) // compact
      .map((ev) => eventLDFromContent(ev, organization)) // transform
    return (
      <DefaultLayout pathname={relativePath}>
        <Metadata.Calendar eventsLD={events}/>
        <Event event={event} nextEvent={nextEvent} prevEvent={prevEvent}/>
      </DefaultLayout>
    )
  }
}

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
    site {
      host
      port
    }
  }

  fragment eventLink on MarkdownRemark {
    fields {
      relativePath
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
