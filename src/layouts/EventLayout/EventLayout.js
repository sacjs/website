import { bool, node, string } from 'prop-types'
import DefaultLayout from '../DefaultLayout'
import React from 'react'

const EventLayout = ({ children, root, slug }) => (
  <DefaultLayout breadcrumbs={root} slug={slug}>
    {children}
  </DefaultLayout>
)

EventLayout.propTypes = {
  children: node,
  root: bool,
  slug: string.isRequired
}

export default EventLayout
