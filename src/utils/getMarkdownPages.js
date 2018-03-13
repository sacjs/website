module.exports = function getEventPages (graphql) {
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              feature
              date
            }
          }
        }
      }
    }
  `)
}
