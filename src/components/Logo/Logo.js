import LogoPng from '../../../static/img/sac_js@1x.png'
import LogoRetinaPng from '../../../static/img/sac_js@2x.png'
import LogoRetinaWebP from '../../../static/img/sac_js@2x.webp'
import LogoWebP from '../../../static/img/sac_js@1x.webp'
import React from 'react'
import { string } from 'prop-types'

const Logo = ({ className }) => (
  <a aria-label="Home" href="/">
    <picture alt="" className={`LogoImg ${className}`} height="150" width="150">
      <source srcSet={`${LogoRetinaWebP}, ${LogoWebP}`} type="image/webp"/>
      <source srcSet={`${LogoRetinaPng}, ${LogoPng}`} type="image/png"/>
      <img
        alt=""
        className={`LogoImg ${className}`}
        height="168"
        src={LogoPng}
        width="168"
      />
    </picture>
  </a>
)

Logo.propTypes = {
  className: string
}

export default Logo
