import dateFormat from 'dateformat'
import Link from 'gatsby-link'
import LocationLink from '../LocationLink'
import { shape, string, object } from 'prop-types'
import React from 'react'

const LastTime = ({ event }) => {
  if (!event) {
    return null
  }
  const {
    fields: { path },
    frontmatter: { date, location, title }
  } = event
  return (
    <div>
      <Link to={path}>
        &larr; {title}
        {', '} {dateFormat(date, 'dddd, mmmm dS')}
      </Link>{' '}
      <LocationLink {...location} linkPrefix="at"/>
    </div>
  )
}

LastTime.propTypes = {
  event: shape({
    fields: shape({
      path: string
    }),
    frontmatter: shape({
      location: object.isRequired,
      title: string
    })
  })
}

export default LastTime
