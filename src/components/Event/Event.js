import { array, object, shape, string } from 'prop-types'
import React from 'react'

const Event = ({ event, nextEvent, prevEvent }) => {
  if (!event) {
    return null // TODO: Add "no scheduled event" "error"
  }
  const { frontmatter: { date, location, schedule, title }, html } = event
  return (
    <article>
      <Event.Title date={date} location={location} title={title}/>
      <Event.Schedule date={date} schedule={schedule}/>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
      <Event.UpNext event={nextEvent}/>
      <Event.WhatElse/>
      <Event.LastTime event={prevEvent}/>
    </article>
  )
}

Event.propTypes = {
  event: shape({
    frontmatter: shape({
      date: object,
      location: object,
      schedule: array,
      title: string
    }).isRequired,
    html: string
  }),
  nextEvent: object,
  prevEvent: object
}

export default Event
