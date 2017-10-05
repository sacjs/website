import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { toSentence } from '../../utils/array'

function componentize (speaker, i) {
  let name = speaker.name
  if (speaker.url) {
    name = <a href={speaker.url}>{name}</a>
  }
  return <li key={i}>{name}</li>
}

const Speakers = ({ speakers }) => (
  <ul>{toSentence(speakers.map(componentize))}</ul>
)

Speakers.defaultProps = {
  speakers: []
}

Speakers.propTypes = {
  speakers: arrayOf(
    shape({
      name: string,
      url: string
    })
  ).isRequired
}

export default Speakers
