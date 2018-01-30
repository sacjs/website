/*
This script queries Meetup.com for a list of all upcoming SacJS meetups and
generates the appropriate Event page based on a generic template. It requires
that the events be created on Meetup.com with the correct date and time.
*/

const dateformat = require('dateformat')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const UpcomingUrl =
  'https://api.meetup.com/2/events?member_id=13188390&offset=0&format=json&limited_events=False&photo-host=public&page=200&fields=&order=time&desc=false&status=upcoming&sig_id=13188390&sig=b95cc8677b14087f7797814774cb19dccabc6f5b'
const Template = fs.readFileSync(path.join(__dirname, 'event_template.md'))

fetch(UpcomingUrl)
  .then((response) => response.json())
  .then((response) =>
    response.results.filter(
      (meetup) => meetup.group.name === 'The Sacramento JavaScript Meetup'
    )
  )
  .then((meetups) =>
    meetups.map((meetup) => ({
      date: dateformat(new Date(meetup.time), 'yyyy-mm-dd HH:MM'),
      filename: `${dateformat(
        new Date(meetup.time),
        'yyyy-mm-dd'
      )}-monthly-meetup.md`,
      id: meetup.id,
      meetup,
      title: 'Monthly Meetup'
    }))
  )
  .then((meetups) =>
    meetups.map((meetup) => {
      let tmpl = Template.toString()
      tmpl = tmpl.replace(/%%MEETUP_DATE%%/m, meetup.date)
      tmpl = tmpl.replace(/%%MEETUP_ID%%/m, meetup.id)
      tmpl = tmpl.replace(/%%MEETUP_TITLE%%/m, meetup.title)
      fs.writeFileSync(`./content/events/${meetup.filename}`, tmpl)
      return tmpl
    })
  )
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
