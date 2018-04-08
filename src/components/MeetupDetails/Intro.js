import dateFormat from 'dateformat'
import stripHtml from 'string-strip-html'

export default function buildIntro (html, date) {
  if (html) {
    return stripHtml(html)
  }
  return `Our ${dateFormat(date, 'mmmm')} meetup will feature talks from:`
}
