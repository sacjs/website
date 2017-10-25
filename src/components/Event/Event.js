import { array, object, shape, string } from 'prop-types'
import './Event.css'
import React from 'react'
import Sidebar from '../../components/Sidebar'

const Event = ({ event, nextEvent, prevEvent }) => {
  if (!event) {
    return null // TODO: Add "no scheduled event" "error"
  }
  const {
    frontmatter: { date, location, meetup, schedule, title },
    html
  } = event
  return (
    <main className="Event">
      <Sidebar meetup={meetup}/>
      <article className="Event-Details">
        <Event.Title date={date} location={location} title={title}/>
        <Event.Schedule date={date} schedule={schedule}/>
        {html && <div dangerouslySetInnerHTML={{ __html: html }}/>}
        <Event.UpNext event={nextEvent}/>
        <Event.WhatElse/>
        <Event.LastTime event={prevEvent}/>
      </article>
    </main>
  )
}

Event.propTypes = {
  event: shape({
    frontmatter: shape({
      date: object,
      location: object,
      meetup: object,
      schedule: array,
      title: string
    }).isRequired,
    html: string
  }),
  nextEvent: object,
  prevEvent: object
}

export default Event
