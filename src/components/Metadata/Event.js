import Head from 'react-helmet'
import { object } from 'prop-types'
import React from 'react'

const EventMetadata = ({ event }) => <Head/>

EventMetadata.propTypes = {
  event: object.isRequired
}

export default EventMetadata
