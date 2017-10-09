const p = require('path')

const EMPTY_EDGE = Object.freeze({
  node: {
    fields: {
      slug: null
    }
  }
})

function getEventPage (eventPages, idx) {
  const { node } = eventPages.data.allMarkdownRemark.edges[idx] || EMPTY_EDGE
  return node
}

module.exports = function createEventPage (
  nodeIndex,
  { boundActionCreators, eventPages, node, path }
) {
  const { createPage } = boundActionCreators
  node = node || getEventPage(eventPages, nodeIndex)
  const prevNode = getEventPage(eventPages, nodeIndex - 1)
  const prevSlug = prevNode.fields.slug
  const nextNode = getEventPage(eventPages, nodeIndex + 1)
  const nextSlug = nextNode.fields.slug
  const nextNextNode = getEventPage(eventPages, nodeIndex + 2)
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
      root: path === '/',
      slug: node.fields.slug
    },
    path: path || node.fields.slug
  })
  return Promise.resolve()
}
