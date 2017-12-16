import dateformat from 'dateformat'
import Head from 'react-helmet'
import { shape, string } from 'prop-types'
import React from 'react'

const EventMetadata = ({ event }) => {
  const { location, startDate } = event
  const data1 = dateformat(startDate, 'dddd, mmmm dS, yyyy, h:MM TT')
  const data2 = `${location.name}, ${location.address.address1}`
  return (
    <Head>
      <meta content="Time" property="twitter:label1"/>
      <meta content={data1} property="twitter:data1"/>
      <meta content="Location" property="twitter:label2"/>
      <meta content={data2} property="twitter:data2"/>
    </Head>
  )
}

EventMetadata.propTypes = {
  event: shape({
    location: shape({
      address: shape({
        address1: string
      }),
      name: string
    })
  })
}

export default EventMetadata
