import AddressLink from '../AddressLink'
import dateFormat from 'dateformat'
import LocationLink from '../LocationLink'
import { object, shape, string } from 'prop-types'
import React from 'react'
// import { styled } from 'styletron-react'

// const H1 = styled('h1', {
//   fontFamily: 'var(--font-accent)'
// })

const EventTitle = ({ date, location, title }) => (
  <header>
    <p>{dateFormat(date, 'dddd, mmmm d')}</p>
    <h1>{title}</h1>
    <p>
      <LocationLink {...location}/>
      <br/>
      <AddressLink {...location.address} href="#"/>
    </p>
  </header>
)

EventTitle.propTypes = {
  date: object,
  location: shape({
    address: object
  }),
  title: string
}

export default EventTitle
