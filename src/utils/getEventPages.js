module.exports = function getEventPages (graphql) {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              relativePath
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
