const createEventPage = require('../utils/createEventPage')

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

module.exports = function eventPageGenerator (
  markdownPages,
  boundActionCreators
) {
  const { eventPages, pages } = extractEventPages(markdownPages)
  return Promise.all([
    generateActiveEventPage(eventPages, boundActionCreators),
    generateEventPages(eventPages, boundActionCreators)
  ]).then(() => pages)
}
