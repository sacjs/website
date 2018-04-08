import { array, number, object, shape, string } from 'prop-types'
import intro from './Intro'
import preamble from './Preamble'
import React from 'react'
import speakerList from './SpeakerList'

const MeetupDetails = ({ children, date, location, schedule, typeCounter }) => (
  <pre>
    {`
${preamble(date, location, typeCounter)}

${intro(children, date)}

${speakerList(schedule)}

SacJS expects all speakers and attendees to follow our Code of Conduct (http://sacjs.com/code-of-conduct/).

Food and liquid refreshments will be provided by our sponsors.

Free parking at The Cannery will be pre-arranged courtesy of The Urban Hive.

If you would also like to sponsor or speak at one of our events, please contact us on GitHub, Twitter (@sac_js (https://twitter.com/sac_js)), #sacjs on the #SacTech Slack Team (http://sac-tech.herokuapp.com/), or Meetup.com.

NOTE: We will be at the *new* Urban Hive location so make sure you go to the right address!
`}
  </pre>
)

MeetupDetails.propTypes = {
  children: string,
  date: string,
  location: shape({
    address: object
  }),
  schedule: array,
  typeCounter: number
}

export default MeetupDetails
