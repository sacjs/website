const p = require('path')

module.exports = function createMeetupDetailsPage (
  nodeIndex,
  { boundActionCreators, eventPages, node, path }
) {
  const { createPage } = boundActionCreators
  const slug = p.join(node.fields.slug, 'details')
  path = (path && p.join(path, 'details')) || slug
  createPage({
    component: p.resolve(`./src/templates/MeetupDetailsTemplate.js`),
    context: {
      eventSlug: node.fields.slug,
      nodeIndex,
      slug
    },
    path
  })
  return Promise.resolve()
}
