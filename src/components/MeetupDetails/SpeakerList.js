import { absoluteUrl } from '../../utils/urlFilters'
import { toSentence } from '../../utils/array'

export default function buildSpeakerList (schedule) {
  return schedule
    .reduce((set, item) => {
      if (item.type !== 'speaker') {
        return set
      }
      const speakerNames = toSentence(
        item.speakers.map(
          (speaker) => `${speaker.name} (${absoluteUrl(speaker.url)})`
        )
      )
      set.push(`* ${speakerNames} - ${item.title || 'Your talk here!'}`)
      return set
    }, [])
    .join('\n')
}
