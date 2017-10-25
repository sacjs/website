import AddressLink from '../AddressLink'
import dateFormat from 'dateformat'
import LocationLink from '../LocationLink'
import { object, shape, string } from 'prop-types'
import React from 'react'
import './Title.css'

const EventTitle = ({ date, location, title }) => (
  <header className="Event-Section Event-Title">
    <p>{dateFormat(date, 'dddd, mmmm d')}</p>
    <h1 className="Event-TitleHeader gel--canon">{title}</h1>
    <p className="Event-TitleLocation">
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
