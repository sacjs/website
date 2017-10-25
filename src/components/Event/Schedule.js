import { absoluteUrl } from '../../utils/urlFilters'
import { array, object, shape, string } from 'prop-types'
import React from 'react'
import './Schedule.css'
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

const Schedule = ({ date, schedule }, { organization }) => (
  <section className="Event-Section Event-Schedule">
    <h2 className="Event-ScheduleTitle gel--trafalgar">Schedule</h2>
    <meta content={date.toISOString()} itemProp="startDate"/>
    <meta content="EventScheduled" itemProp="eventStatus"/>
    <meta content={absoluteUrl(organization.logo.url)} itemProp="image"/>
    <ul className="Event-ScheduleList">{segmentize(date, schedule)}</ul>
  </section>
)

Schedule.contextTypes = {
  organization: shape({
    logo: shape({
      url: string
    })
  }).isRequired
}

Schedule.propTypes = {
  date: object.isRequired,
  schedule: array
}

export default Schedule
