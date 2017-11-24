const p = require('path')

const EMPTY_EDGE = Object.freeze({
  node: {
    fields: {
      slug: null
    }
  }
})

const NewEventPath = /\/events\/(\d{4})-(\d{2})-(\d{2})-(.+[^/])/

function getEventPage (eventPages, idx) {
  const { node } = eventPages.data.allMarkdownRemark.edges[idx] || EMPTY_EDGE
  return node
}

module.exports = function createEventPage (
  nodeIndex,
  { boundActionCreators, eventPages, node, path }
) {
  const { createPage, createRedirect } = boundActionCreators
  node = node || getEventPage(eventPages, nodeIndex)
  const prevNode = getEventPage(eventPages, nodeIndex - 1)
  const prevSlug = prevNode.fields.slug
  const nextNode = getEventPage(eventPages, nodeIndex + 1)
  const nextSlug = nextNode.fields.slug
  const nextNextNode = getEventPage(eventPages, nodeIndex + 2)
  const nextNextSlug = nextNextNode.fields.slug
  path = path || node.fields.slug
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
    path
  })
  if (NewEventPath.test(path)) {
    const [year, month, day, title] = path.match(NewEventPath).slice(1)
    createRedirect({
      fromPath: `/${year}/${month}/${day}/${title}.html`,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: path || node.fields.slug
    })
  }
  return Promise.resolve()
}
