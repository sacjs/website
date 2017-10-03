const path = require('path')

module.exports = function eventPageGenerator (graphql, boundActionCreators) {
  const { createPage } = boundActionCreators
  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { feature: { eq: true } } }
        limit: 1
      ) {
        edges {
          node {
            fields {
              relativePath
              slug
            }
          }
        }
      }
    }
  `).then((result) =>
    result.data.allMarkdownRemark.edges.map(({ node }) =>
      createPage({
        component: path.resolve(`./src/templates/EventTemplate.js`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          relativePath: node.fields.relativePath,
          slug: node.fields.slug
        },
        path: '/'
      })
    )
  )
}
