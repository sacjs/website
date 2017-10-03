import { site } from '../metadata'

// Ported from Jekyll
// See also:
//   https://github.com/jekyll/jekyll/pull/5399
export function absoluteUrl (input, { hostname, port }) {
  if (!input) {
    return input
  }
  if (!site.url) {
    return relativeUrl(input)
  }
  let host = site.url
  if (process.env.NODE_ENV === 'development') {
    host = `//${hostname}:${port}`
  }
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
