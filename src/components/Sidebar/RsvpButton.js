import fetch from 'fetch-jsonp'
import React from 'react'
import './RsvpButton.css'
import { number } from 'prop-types'

const UpcomingUrl =
  'https://api.meetup.com/2/events?member_id=13188390&offset=0&format=json&limited_events=False&photo-host=public&page=200&fields=&order=time&desc=false&status=upcoming'

function pluralize (str, count = 0) {
  if (count === 1) {
    return str
  }
  return `${str}s`
}

export default class RsvpButton extends React.Component {
  static propTypes = {
    meetupId: number.isRequired
  }
  state = {
    count: -1,
    isPastEvent: true
  }
  componentDidMount () {
    // TODO: Fix JSON-P support in Node for server-side rendering
    if (typeof window !== 'undefined') {
      fetch(UpcomingUrl)
        .then((response) => response.json())
        .then(this.handleUpcomingMeetups)
        .catch((err) => console.error(err))
    }
  }
  handleUpcomingMeetups = (response) => {
    if (response.results && response.results.length) {
      const meetup = response.results.find(
        (event) => Number(event.id) === this.props.meetupId
      )
      if (meetup) {
        return this.setState({
          count: meetup.yes_rsvp_count,
          isPastEvent: false
        })
      }
    }
    return this.setState({ isPastEvent: true })
  }
  render () {
    let content = ''
    if (this.state.isPastEvent) {
      content = <div className="RsvpButton-Thanks">Thanks for coming!</div>
    } else {
      content = (
        <a
          className="RsvpButton-Link"
          href={`http://www.meetup.com/The-Sacramento-Javascript-Meetup/events/${
            this.props.meetupId
          }`}
        >
          <div className="RsvpButton-LinkPromo">
            Join {this.state.count} {pluralize('other', this.state.count)}
          </div>
          <div className="RsvpButton-LinkPromoText">RSVP Today</div>
        </a>
      )
    }
    return <div className="RsvpButton">{content}</div>
  }
}
