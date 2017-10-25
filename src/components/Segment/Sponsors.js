import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import './Sponsors.css'
import { toSentence } from '../../utils/array'

function componentize (sponsor, i) {
  let name = sponsor.name
  if (sponsor.url) {
    name = <a href={sponsor.url}>{name}</a>
  }
  return <span key={i}>{name}</span>
}

const Sponsors = ({ sponsors }) => {
  if (!sponsors || !sponsors.length) {
    return null
  }
  return (
    <div className="Sponsors gel--brevier">
      Sponsored by {toSentence(sponsors.map(componentize))}
    </div>
  )
}

Sponsors.defaultProps = {
  sponsors: []
}

Sponsors.propTypes = {
  sponsors: arrayOf(
    shape({
      url: string
    })
  )
}

export default Sponsors
