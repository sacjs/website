const { createFilePath } = require('gatsby-source-filesystem')

// Keeps track of the first "featured" event
let FEATURED_NODE = null

module.exports = function addSlugToNode (createNodeField, getNode, node) {
  const slug = createFilePath({ getNode, node })
  if (node.frontmatter.feature) {
    // If a Featured Event has already been defined, then throw. We cannot have
    // *two* featured events!
    if (FEATURED_NODE && FEATURED_NODE !== node) {
      throw new Error(
        `Multiple "featured" events detected: ${FEATURED_NODE.frontmatter
          .date} and ${node.frontmatter.date}`
      )
    }
    FEATURED_NODE = node
  }
  createNodeField({
    name: 'path',
    node,
    value: `/events${slug}`
  })
  createNodeField({
    name: 'slug',
    node,
    value: slug
  })
}
