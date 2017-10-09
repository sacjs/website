const get = require('lodash.get')
const metadata = require('../metadata')

const LIQUID_TAGS = /{{([^}]*)}}/g

// Incredibly naïve "implementation" of Liquid Template syntax
// Basically, this only handles simple text replacement of values store in the
// various metadata objects
module.exports = function interpolateLiquidSyntax (node) {
  if (node.internal && node.internal.content) {
    node.internal.content = node.internal.content.replace(
      LIQUID_TAGS,
      (_, tag) => get(metadata, tag.trim(), '')
    )
  }
  return node
}
