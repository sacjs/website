import ConductBlurb from '../../components/ConductBlurb'
import Logo from '../../components/Logo'
import './Page.css'
import React from 'react'
import SocialMediaLinks from '../../components/SocialMediaLinks'
import { string } from 'prop-types'

const Page = ({ content }) => (
  <article className="Page">
    <header className="Page-Header">
      <Logo className="Page-Logo"/>
    </header>
    <main
      className="Page-Content md"
      dangerouslySetInnerHTML={{ __html: content }}
    />
    <footer className="Page-Footer">
      <SocialMediaLinks/>
      <ConductBlurb/>
    </footer>
  </article>
)

Page.propTypes = {
  content: string
}

export default Page
