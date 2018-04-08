import { site } from '../metadata'

const EXTERNAL_LINK = /^https?:\/\//

// Ported from Jekyll
// See also:
//   https://github.com/jekyll/jekyll/pull/5399
export function absoluteUrl (input) {
  if (!input) {
    return input
  }
  if (EXTERNAL_LINK.test(input)) {
    return input
  }
  if (!site.url) {
    return relativeUrl(input)
  }
  const host = site.url
  return host + relativeUrl(input)
}

// Ported from Jekyll
// See also:
//   https://github.com/jekyll/jekyll/pull/5399
function ensureLeadingSlash (input) {
  if (!input || input.startsWith('/')) {
    return input
  }
  return `/${input}`
}

// Ported from Jekyll
// See also:
//   https://github.com/jekyll/jekyll/pull/5399
export function relativeUrl (input) {
  if (!input) {
    return ''
  }
  return (
    ensureLeadingSlash(site.baseUrl) +
    ensureLeadingSlash(input.replace('index.html', ''))
  )
}
