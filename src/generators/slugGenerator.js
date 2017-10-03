const { createFilePath } = require('gatsby-source-filesystem')

module.exports = function addSlugToNode (createNodeField, getNode, node) {
  const slug = createFilePath({ getNode, node })
  createNodeField({
    name: 'slug',
    node,
    value: slug
  })
  createNodeField({
    name: 'relativePath',
    node,
    value: `/events${slug}`
  })
}