/* eslint-disable camelcase */
import { formatAddress } from '../../utils/string'
import { number, string } from 'prop-types'
import React from 'react'

const AddressLink = ({ address1, address2, city, postal_code, state }) => {
  const content = formatAddress({
    address1,
    address2,
    city,
    postal_code,
    state
  })
  const url = `http://maps.google.com/maps?q=${encodeURIComponent(
    content
  ).replace('%20', '+')}`
  return <a href={url}>{content}</a>
}

AddressLink.defaultProps = {
  address2: ''
}

AddressLink.propTypes = {
  address1: string.isRequired,
  address2: string,
  city: string.isRequired,
  postal_code: number.isRequired,
  state: string.isRequired
}

export default AddressLink
