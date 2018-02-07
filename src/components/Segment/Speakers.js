import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import './Speakers.css'
import { toSentence } from '../../utils/array'

function componentize (speaker, i) {
  let name = speaker.name
  if (speaker.url) {
    name = <a href={speaker.url}>{name}</a>
  }
  return <span key={i}>{name}</span>
}

const Speakers = ({ speakers }) => {
  if (!speakers || !speakers.length) {
    return null
  }
  return (
    <div className="Speakers">{toSentence(speakers.map(componentize))}</div>
  )
}

Speakers.defaultProps = {
  speakers: []
}

Speakers.propTypes = {
  speakers: arrayOf(
    shape({
      name: string,
      url: string
    })
  )
}

export default Speakers
