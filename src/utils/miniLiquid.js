const fs = require('fs')
const get = require('lodash.get')
const metadata = require('../metadata')
const path = require('path')

const LIQUID_INCLUDE = /{%\s*include ([^%]*)\s*%}/g
const LIQUID_TAGS = /{{([^}]*)}}/g

// Incredibly naïve "implementation" of Liquid Template syntax
module.exports = function interpolateLiquidSyntax (node) {
  if (node.internal && node.internal.content) {
    // File includes
    node.internal.content = node.internal.content.replace(
      LIQUID_INCLUDE,
      (_, p) =>
        fs
          .readFileSync(path.resolve('content/_includes', p.trim()))
          .toString()
          .trim()
    )
    // String interpolation
    node.internal.content = node.internal.content.replace(
      LIQUID_TAGS,
      (_, tag) => get(metadata, tag.trim(), '')
    )
  }
  return node
}
