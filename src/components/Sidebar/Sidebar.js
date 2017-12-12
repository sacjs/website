import Logo from '../../components/Logo'
import { object, shape, string } from 'prop-types'
import React from 'react'
import RsvpButton from './RsvpButton'
import './Sidebar.css'

const Sidebar = ({ className, meetup }, { organization: { location } }) => (
  <aside className="Sidebar">
    <header className="Sidebar-Header">
      <Logo className="Sidebar-LogoImg"/>
    </header>
    <section className="Sidebar-Details">
      <p>
        Javascript, web technologies, and community building on the fourth
        Tuesday of every month at <a href={location.url}>{location.name}</a>.
      </p>
    </section>
    <section className="Sidebar-RSVP">
      <RsvpButton meetupId={meetup && meetup.id}/>
    </section>
    <footer className="Sidebar-Footer gel--brevier">
      SacJS expects all speakers and attendees to follow our{' '}
      <a href="/code-of-conduct/">Code of Conduct</a>.
    </footer>
  </aside>
)

Sidebar.contextTypes = {
  organization: shape({
    location: shape({
      name: string,
      url: string
    })
  })
}

Sidebar.propTypes = {
  className: string,
  meetup: object
}

export default Sidebar
