import DefaultLayout from '../DefaultLayout'
import { node, string } from 'prop-types'
import Page from '../../components/Page'
import React from 'react'

const PageLayout = ({ children, description, slug, title }) => (
  <DefaultLayout pageDescription={description} pageTitle={title} slug={slug}>
    <Page content={children}/>
  </DefaultLayout>
)

PageLayout.propTypes = {
  children: node,
  description: string,
  slug: string.isRequired,
  title: string
}

export default PageLayout
