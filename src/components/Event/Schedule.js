import { absoluteUrl } from '../../utils/urlFilters'
import { array, object, shape, string } from 'prop-types'
import React from 'react'
import Segment from '../Segment'

function componentize (time, segment, i) {
  return <Segment {...segment} key={i} time={time}/>
}

function segmentize (date, segments) {
  return segments.reduce(
    (set, segment, i) => {
      const { duration, offset } = segment
      const segmentTime = new Date(set.clock.getTime() + (offset || 0) * 60000)
      const clock = new Date(segmentTime.getTime() + duration * 60000)
      return {
        clock,
        segments: set.segments.concat([componentize(segmentTime, segment, i)])
      }
    },
    {
      clock: date,
      segments: []
    }
  ).segments
}

const Schedule = ({ date, schedule }, { organization, ...context }) => (
  <section>
    <h2>Schedule</h2>
    <meta content={date.toISOString()} itemProp="startDate"/>
    <meta content="EventScheduled" itemProp="eventStatus"/>
    <meta
      content={absoluteUrl(organization.logo.url, context)}
      itemProp="image"
    />
    <ul>{segmentize(date, schedule)}</ul>
  </section>
)

Schedule.contextTypes = {
  hostname: string,
  organization: shape({
    logo: shape({
      url: string
    })
  }).isRequired,
  port: string
}

Schedule.propTypes = {
  date: object.isRequired,
  schedule: array
}

export default Schedule
