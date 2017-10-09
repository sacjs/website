const addSlugToNode = require('./src/generators/slugGenerator')
const generateActiveEventPage = require('./src/generators/activeEventGenerator')
const generateEventPages = require('./src/generators/eventPageGenerator')
const getEventPages = require('./src/utils/getEventPages')

// Keeps track of the first "featured" event
let FEATURED_NODE = null

function validateFeatures (node) {
  if (node.frontmatter.feature) {
    // If a Featured Event has already been defined, then throw. We cannot have
    // *two* featured events!
    if (FEATURED_NODE && FEATURED_NODE.id !== node.id) {
      throw new Error(
        `Multiple "featured" events detected: ${FEATURED_NODE.frontmatter
          .date} and ${node.frontmatter.date}`
      )
    }
    FEATURED_NODE = node
  }
  return true
}

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  page.context = Object.assign({}, page.context, {
    path: page.context.path || page.path
  })
  createPage(page)
  return Promise.resolve()
}

exports.onCreateNode = ({ boundActionCreators, node, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    validateFeatures(node)
    const slug = addSlugToNode(createNodeField, getNode, node)
    createNodeField({
      name: 'path',
      node,
      value: `/events${slug}`
    })
  }
}

exports.createPages = ({ boundActionCreators, graphql }) =>
  getEventPages(graphql).then((eventPages) =>
    Promise.all([
      generateActiveEventPage(eventPages, boundActionCreators),
      generateEventPages(eventPages, boundActionCreators)
    ])
  )
