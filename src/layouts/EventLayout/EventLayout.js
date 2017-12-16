import { bool, node, string } from 'prop-types'
import DefaultLayout from '../DefaultLayout'
import React from 'react'

const EventLayout = ({ children, root, slug, title }) => (
  <DefaultLayout breadcrumbs={root} pageTitle={title} slug={slug}>
    {children}
  </DefaultLayout>
)

EventLayout.propTypes = {
  children: node,
  root: bool,
  slug: string.isRequired,
  title: string
}

export default EventLayout
