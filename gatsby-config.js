const site = require('./src/metadata/site')

module.exports = {
  plugins: [
    {
      options: {
        trackingId: site.gaTrackingId
      },
      resolve: 'gatsby-plugin-google-analytics'
    },
    {
      options: {
        throw: true
      },
      resolve: 'gatsby-plugin-react-a11y'
    },
    'gatsby-plugin-react-helmet',
    {
      options: {
        name: 'content',
        path: `${__dirname}/content/`
      },
      resolve: 'gatsby-source-filesystem'
    },
    'gatsby-transformer-remark',
    {
      options: {
        background_color: site.themeColor,
        display: 'standalone',
        icons: [
          {
            sizes: '192x192',
            src: '/img/favicons/android-chrome-192x192.png',
            type: 'image/png'
          },
          {
            sizes: '512x512',
            src: '/img/favicons/android-chrome-512x512.png',
            type: 'image/png'
          }
        ],
        name: site.description,
        short_name: site.title,
        start_url: '/',
        theme_color: site.themeColor
      },
      resolve: 'gatsby-plugin-manifest'
    }
  ]
}
