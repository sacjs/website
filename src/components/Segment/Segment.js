import { arrayOf, object, oneOf, string } from 'prop-types'
import dateFormat from 'dateformat'
import React from 'react'

const Segment = ({ description, speakers, sponsors, time, title, type }) => (
  <li>
    <header>
      <time dateTime={time.toISOString()}>{dateFormat(time, 'h:MM tt')}</time>
      <span>{type}</span>
    </header>
    <section>
      <Segment.Speakers speakers={speakers || undefined}/>
      <div>{title}</div>
      <div>{description}</div>
      <Segment.Sponsors sponsors={sponsors || undefined}/>
    </section>
  </li>
)

Segment.propTypes = {
  description: string,
  speakers: arrayOf(object),
  sponsors: arrayOf(object),
  time: object,
  title: string,
  type: oneOf(['learn', 'mc', 'social', 'speaker'])
}

export default Segment
