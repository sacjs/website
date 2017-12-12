import LogoSvg from '../../../static/img/sac_js.min.svg'
import React from 'react'
import { string } from 'prop-types'

const Logo = ({ className }) => (
  <a aria-label="Home" href="/">
    <img
      alt=""
      className={`LogoImg ${className}`}
      height="150"
      src={LogoSvg}
      width="150"
    />
  </a>
)

Logo.propTypes = {
  className: string
}

export default Logo
