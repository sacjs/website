import { arrayOf, object, oneOf, string } from 'prop-types'
import dateFormat from 'dateformat'
import React from 'react'
import './Segment.css'

const Segment = ({ description, speakers, sponsors, time, title, type }) => (
  <li className="Segment">
    <header className="Segment-Header">
      <time className="Segment-Time" dateTime={time.toISOString()}>
        {dateFormat(time, 'h:MM tt')}
      </time>
      <span className="Segment-Type">{type}</span>
    </header>
    <section className="Segment-Info">
      <Segment.Speakers speakers={speakers}/>
      <div className="Segment-Title" data-has-speakers={Boolean(speakers)}>
        {title}
      </div>
      <div className="Segment-Description">{description}</div>
      <Segment.Sponsors sponsors={sponsors}/>
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
