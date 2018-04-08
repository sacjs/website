const createEventPage = require('../utils/createEventPage')
const createMeetupDetailsPage = require('../utils/createMeetupDetailsPage')

function getTypeCounter (counters, node, idx) {
  const slug = node.fields.slug
  if (
    slug.includes('beer_js') ||
    slug.includes('beerjs') ||
    slug.includes('coffee_js')
  ) {
    counters.socials = counters.socials + 1
    return counters.socials
  }
  if (slug.includes('monthly-meetup') || slug.includes('lightning-talk')) {
    counters.meetups = counters.meetups + 1
    return counters.meetups
  }
  return 0
}

function extractEventPages (result) {
  return result.data.allMarkdownRemark.edges.reduce(
    (pageSets, { node }) => {
      let key = 'pages'
      if (node.fields.slug.startsWith('/events')) {
        key = 'eventPages'
      }
      pageSets[key].data.allMarkdownRemark.edges.push({ node })
      return pageSets
    },
    {
      eventPages: { data: { allMarkdownRemark: { edges: [] } } },
      pages: { data: { allMarkdownRemark: { edges: [] } } }
    }
  )
}

function findFeaturedEventIdx (result) {
  return result.data.allMarkdownRemark.edges.findIndex(
    ({ node }) => node.frontmatter.feature
  )
}

function generateActiveEventPage (eventPages, boundActionCreators) {
  const featuredIdx = findFeaturedEventIdx(eventPages)
  return createEventPage(featuredIdx, {
    boundActionCreators,
    eventPages,
    path: '/'
  })
}

function generateEventPages (eventPages, boundActionCreators) {
  return Promise.all(
    eventPages.data.allMarkdownRemark.edges.map(({ node }, idx) =>
      createEventPage(idx, {
        boundActionCreators,
        eventPages,
        node
      })
    )
  )
}

function generateMeetupDetails (eventPages, boundActionCreators) {
  const counters = {
    meetups: 0,
    socials: 0
  }
  return Promise.all(
    eventPages.data.allMarkdownRemark.edges.map(({ node }, idx) => {
      const typeCounter = getTypeCounter(counters, node, idx)
      return createMeetupDetailsPage(idx, typeCounter, {
        boundActionCreators,
        eventPages,
        node
      })
    })
  )
}

module.exports = function eventPageGenerator (
  markdownPages,
  boundActionCreators
) {
  const { eventPages, pages } = extractEventPages(markdownPages)
  return Promise.all([
    generateActiveEventPage(eventPages, boundActionCreators),
    generateEventPages(eventPages, boundActionCreators),
    generateMeetupDetails(eventPages, boundActionCreators)
  ]).then(() => pages)
}
