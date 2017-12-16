import { bool, node, string } from 'prop-types'
import DefaultLayout from '../DefaultLayout'
import React from 'react'

const EventLayout = ({ children, description, root, slug, title }) => (
  <DefaultLayout
    breadcrumbs={root}
    pageDescription={description}
    pageTitle={title}
    slug={slug}
  >
    {children}
  </DefaultLayout>
)

EventLayout.propTypes = {
  children: node,
  description: string.isRequired,
  root: bool,
  slug: string.isRequired,
  title: string
}

export default EventLayout
