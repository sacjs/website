import Link from 'gatsby-link'
import LocationLink from '../LocationLink'
import { shape, string, object } from 'prop-types'
import React from 'react'

const LastTime = ({ event }) => {
  if (!event) {
    return null
  }
  const { fields: { relativePath }, frontmatter: { location, title } } = event
  return (
    <div>
      <Link to={relativePath}>&larr; {title}</Link>{' '}
      <LocationLink {...location} linkPrefix="at"/>
    </div>
  )
}

LastTime.propTypes = {
  event: shape({
    fields: shape({
      relativePath: string
    }),
    frontmatter: shape({
      location: object.isRequired,
      title: string
    })
  })
}

export default LastTime
