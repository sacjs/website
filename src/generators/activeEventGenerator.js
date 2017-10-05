const createEventPage = require('../utils/createEventPage')

function findFeaturedEventIdx (result) {
  return result.data.allMarkdownRemark.edges.findIndex(
    ({ node }) => node.frontmatter.feature
  )
}

module.exports = function featuredEventPageGenerator (
  eventPagesResult,
  boundActionCreators
) {
  const featuredIdx = findFeaturedEventIdx(eventPagesResult)
  return createEventPage(featuredIdx, {
    boundActionCreators,
    eventPagesResult,
    path: '/'
  })
}
