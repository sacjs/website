import { bool, shape, string } from 'prop-types'
import Metadata from '../components/Metadata'
import Page from '../components/Page'
import PageLayout from '../layouts/PageLayout'
import React from 'react'

const PageTemplate = ({ data: { page }, pathContext: { root } }) => {
  const { fields: { slug }, frontmatter: { description, title }, html } = page
  return (
    <PageLayout description={description} root={root} slug={slug} title={title}>
      <Metadata.Page/>
      <Page content={html}/>
    </PageLayout>
  )
}

PageTemplate.propTypes = {
  data: shape({
    page: shape({
      frontmatter: shape({
        description: string.isRequired,
        title: string.isRequired
      }),
      html: string.isRequired
    })
  }),
  pathContext: shape({
    root: bool
  })
}

export default PageTemplate

export const query = graphql`
  query PageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        description
        title
      }
      html
    }
  }
`
