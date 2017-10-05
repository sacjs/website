import dateFormat from 'dateformat'
import padStart from 'lodash.padstart'

export function getDuration (date, schedule) {
  const times = schedule.reduce(
    (set, segment, i) => {
      const { duration, offset } = segment
      const segmentTime = new Date(set.clock.getTime() + (offset || 0) * 60000)
      const clock = new Date(segmentTime.getTime() + duration * 60000)
      return {
        clock,
        segmentTimes: set.segmentTimes.concat([
          {
            beginsAt: segmentTime,
            endsAt: clock
          }
        ])
      }
    },
    {
      clock: date,
      segmentTimes: []
    }
  )
  return {
    doorTime: times.segmentTimes[0].beginsAt,
    endDate: times.segmentTimes[times.segmentTimes.length - 1].endsAt
  }
}

// Returns an ISO8601 date with timezone offset data
export function toLocalISOString (date) {
  if (!date) {
    return null
  }
  const formattedDate = dateFormat(date, `yyyy-mm-dd'T'HH:MM:ss`)
  const tzo = date.getTimezoneOffset() * -1
  let sign = '-'
  if (tzo === 0) {
    return `${formattedDate}Z`
  } else if (tzo >= 0) {
    sign = '+'
  }
  const offsetPrefix = padStart(Math.abs(Math.floor(tzo / 60)).toString(), 2, 0)
  const offsetSuffix = padStart((tzo % 60).toString(), 2, 0)
  const offsetStr = `${sign}${offsetPrefix}:${offsetSuffix}`
  return `${formattedDate}${offsetStr}`
}
