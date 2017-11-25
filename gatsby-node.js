const addSlugToNode = require('./src/generators/slugGenerator')
const generateEventPages = require('./src/generators/eventPageGenerator')
const generateGenericPages = require('./src/generators/genericPageGenerator')
const getMarkdownPages = require('./src/utils/getMarkdownPages')
const liquid = require('./src/utils/miniLiquid')
const partialRight = require('lodash.partialright')

// Keeps track of the first "featured" event
let FEATURED_NODE = null

function validateFeatures (node) {
  if (node.frontmatter.feature) {
    // If a Featured Event has already been defined, then throw.
    // We cannot have *two* featured events!
    if (FEATURED_NODE && FEATURED_NODE.id !== node.id) {
      throw new Error(
        `Multiple "featured" events detected: ${FEATURED_NODE.frontmatter
          .date} and ${node.frontmatter.date}`
      )
    }
    FEATURED_NODE = node
  }
  return true
}

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  page.context = Object.assign({}, page.context, {
    path: page.context.path || page.path
  })
  createPage(page)
  return Promise.resolve()
}

exports.onCreateNode = ({ boundActionCreators, node, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    validateFeatures(node)
    addSlugToNode(createNodeField, getNode, node)
    liquid(node)
  }
}

exports.createPages = ({ boundActionCreators, graphql }) =>
  getMarkdownPages(graphql)
    .then(partialRight(generateEventPages, boundActionCreators))
    .then(partialRight(generateGenericPages, boundActionCreators))

exports.modifyWebpackConfig = ({ config, stage, store }, options) => {
  const { program } = store.getState()
  switch (stage) {
    case 'build-css':
      // NOTE: Blow away the internal reference to the PostCSS config because the
      // functional version of merge still doesn't replace it (even though the
      // documentation of webpack-configurator says it should ¯\_(ツ)_/¯)
      config._config.postcss = []
      config.merge({
        postcss: [
          // NOTE: This disables PostCSS customProperties because the browsers
          // support setting properties on non-root elements to allow overrides
          // and PostCSS does not. Evergreen browsers have decently wide
          // support for custom properties now, so there isn't as much need to
          // "polyfill" them via PostCSS.
          require(`postcss-import`)(),
          require(`postcss-cssnext`)({
            browsers: program.browserslist,
            features: {
              customMedia: {
                extensions: {
                  '--phone': '(min-width: 640px)'
                }
              },
              customProperties: false
            }
          })
        ]
      })
      return config
    case 'develop':
      config.merge({
        postcss (wp) {
          // NOTE: This disables PostCSS customProperties because the browsers
          // support setting properties on non-root elements to allow overrides
          // and PostCSS does not. Evergreen browsers have decently wide
          // support for custom properties now, so there isn't as much need to
          // "polyfill" them via PostCSS.
          return [
            require(`postcss-import`)({ addDependencyTo: wp }),
            require(`postcss-cssnext`)({
              browsers: program.browserslist,
              features: {
                customMedia: {
                  extensions: {
                    '--phone': '(min-width: 640px)'
                  }
                },
                customProperties: false
              }
            }),
            require(`postcss-browser-reporter`),
            require(`postcss-reporter`)
          ]
        }
      })
      return config
    default:
      return config
  }
}
