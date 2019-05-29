import dateFormat from 'dateformat'
import Link from 'gatsby-link'
import LocationLink from '../LocationLink'
import { object, shape, string } from 'prop-types'
import React from 'react'
import './UpNext.css'

const UpNext = ({ event }) => {
  if (!event) {
    return null
  }
  const {
    fields: { slug },
    frontmatter: { date, location, title }
  } = event
  return (
    <section className="Event-Section Event-UpNext">
      <header>
        <h2 className="Event-UpNextTitle">What&apos;s Next?</h2>
      </header>
      <p className="Event-UpNextContent">
        <Link to={slug}>
          {title}
          {', '}
          {dateFormat(date, 'dddd, mmmm dS')}
        </Link>{' '}
        <LocationLink {...location} linkPrefix="at"/>
      </p>
    </section>
  )
}

UpNext.propTypes = {
  event: shape({
    fields: shape({
      slug: string.isRequired
    }),
    frontmatter: shape({
      date: object.isRequired,
      location: object.isRequired,
      title: string.isRequired
    })
  })
}

export default UpNext
