module.exports = {
  plugins: [
    {
      options: {
        throw: true
      },
      resolve: 'gatsby-plugin-react-a11y'
    },
    'gatsby-plugin-react-helmet',
    {
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      },
      resolve: `gatsby-source-filesystem`
    },
    `gatsby-transformer-remark`
  ]
}
