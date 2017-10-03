const addSlugToNode = require('./src/generators/slugGenerator')
const generateActiveEventPage = require('./src/generators/activeEventGenerator')
const generateEventPages = require('./src/generators/eventPageGenerator')

exports.onCreateNode = ({ boundActionCreators, node, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    addSlugToNode(createNodeField, getNode, node)
  }
}

exports.createPages = ({ graphql, boundActionCreators }) =>
  Promise.all([
    generateActiveEventPage(graphql, boundActionCreators),
    generateEventPages(graphql, boundActionCreators)
  ])
