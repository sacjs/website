const createEventPage = require('../utils/createEventPage')

module.exports = function eventPageGenerator (
  eventPagesResult,
  boundActionCreators
) {
  return Promise.all(
    eventPagesResult.data.allMarkdownRemark.edges.map(({ node }, idx) =>
      createEventPage(idx, {
        boundActionCreators,
        eventPagesResult,
        node,
        path: node.fields.relativePath
      })
    )
  )
}
