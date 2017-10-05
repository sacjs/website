import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { toSentence } from '../../utils/array'

function componentize (sponsor, i) {
  let name = sponsor.name
  if (sponsor.url) {
    name = <a href={sponsor.url}>{name}</a>
  }
  return <span key={i}>{name}</span>
}

const Sponsors = ({ sponsors }) => {
  if (sponsors.length === 0) {
    return null
  }
  return <div>Sponsored by {toSentence(sponsors.map(componentize))}</div>
}

Sponsors.defaultProps = {
  sponsors: []
}

Sponsors.propTypes = {
  sponsors: arrayOf(
    shape({
      url: string
    })
  ).isRequired
}

export default Sponsors
