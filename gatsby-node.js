const addSlugToNode = require('./src/generators/slugGenerator')
const generateActiveEventPage = require('./src/generators/activeEventGenerator')
const generateEventPages = require('./src/generators/eventPageGenerator')
const getEventPages = require('./src/utils/getEventPages')

exports.onCreateNode = ({ boundActionCreators, node, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    addSlugToNode(createNodeField, getNode, node)
  }
}

exports.createPages = ({ boundActionCreators, graphql }) =>
  getEventPages(graphql).then((eventPages) =>
    Promise.all([
      generateActiveEventPage(eventPages, boundActionCreators),
      generateEventPages(eventPages, boundActionCreators)
    ])
  )
