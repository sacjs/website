module.exports = function getEventPages (graphql) {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              path
              slug
            }
            frontmatter {
              feature
            }
          }
        }
      }
    }
  `)
}
