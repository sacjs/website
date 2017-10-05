import React from 'react'
import { string } from 'prop-types'

const LocationLink = ({ name, linkPrefix, url }) => {
  if (!name) {
    return null
  }
  if (!url) {
    return `${linkPrefix} ${name}`.trim()
  }
  return (
    <span>
      {linkPrefix} <a href={url}>{name}</a>
    </span>
  )
}

LocationLink.propTypes = {
  linkPrefix: string,
  name: string,
  url: string
}

export default LocationLink
