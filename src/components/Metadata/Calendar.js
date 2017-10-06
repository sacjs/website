import { arrayOf, object, shape, string } from 'prop-types'
import EventBuilder from '../../builders/JSON-LD/Event'
import Head from 'react-helmet'
import React from 'react'

const CalendarMetadata = ({ eventsLD }) => {
  const eventData = eventsLD.map((event) => EventBuilder(event))
  return (
    <Head>
      <script id="cal" type="application/ld+json">
        {JSON.stringify(eventData)}
      </script>
    </Head>
  )
}

CalendarMetadata.propTypes = {
  eventsLD: arrayOf(
    shape({
      description: string.isRequired,
      doorTime: object.isRequired,
      endDate: object.isRequired,
      eventStatus: string.isRequired,
      image: string.isRequired,
      location: object.isRequired,
      meetup: object.isRequired,
      name: string.isRequired,
      performers: arrayOf(object).isRequired,
      startDate: object.isRequired,
      url: string.isRequired
    }).isRequired
  )
}

export default CalendarMetadata
