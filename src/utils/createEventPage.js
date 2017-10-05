const p = require('path')

const EMPTY_EDGE = Object.freeze({
  node: {
    fields: {
      slug: null
    }
  }
})

function getEventPage (result, idx) {
  const { node } = result.data.allMarkdownRemark.edges[idx] || EMPTY_EDGE
  return node
}

module.exports = function createEventPage (
  nodeIndex,
  { boundActionCreators, eventPagesResult, node, path }
) {
  const { createPage } = boundActionCreators
  node = node || getEventPage(eventPagesResult, nodeIndex)
  const prevNode = getEventPage(eventPagesResult, nodeIndex - 1)
  const prevSlug = prevNode.fields.slug
  const nextNode = getEventPage(eventPagesResult, nodeIndex + 1)
  const nextSlug = nextNode.fields.slug
  const nextNextNode = getEventPage(eventPagesResult, nodeIndex + 2)
  const nextNextSlug = nextNextNode.fields.slug
  createPage({
    component: p.resolve(`./src/templates/EventTemplate.js`),
    context: {
      // Data passed to context is available in page queries as GraphQL variables.
      hasNextNextSlug: Boolean(nextNextSlug),
      hasNextSlug: Boolean(nextSlug),
      hasPrevSlug: Boolean(prevSlug),
      nextNextSlug,
      nextSlug,
      prevSlug,
      slug: node.fields.slug
    },
    path
  })
  return Promise.resolve()
}
