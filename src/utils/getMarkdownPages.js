module.exports = function getEventPages (graphql) {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
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
