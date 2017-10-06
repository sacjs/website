import { bool, node, string } from 'prop-types'
import DefaultLayout from '../DefaultLayout'
import React from 'react'

const EventLayout = ({ children, path, root }) => (
  <DefaultLayout breadcrumbs={root} path={path}>
    {children}
  </DefaultLayout>
)

EventLayout.propTypes = {
  children: node,
  path: string.isRequired,
  root: bool
}

export default EventLayout
