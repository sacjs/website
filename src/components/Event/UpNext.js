import dateFormat from 'dateformat'
import Link from 'gatsby-link'
import LocationLink from '../LocationLink'
import { object, shape, string } from 'prop-types'
import React from 'react'

const UpNext = ({ event }) => {
  if (!event) {
    return null
  }
  const {
    fields: { relativePath },
    frontmatter: { date, location, title }
  } = event
  return (
    <section>
      <header>
        <h2>What&apos;s Next?</h2>
      </header>
      <p>
        <Link to={relativePath}>
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
      relativePath: string
    }),
    frontmatter: shape({
      date: object,
      location: object.isRequired,
      title: string
    })
  })
}

export default UpNext
