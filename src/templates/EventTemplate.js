import DefaultLayout from '../layouts/DefaultLayout'
import { object, shape, string } from 'prop-types'
import React from 'react'

export default class EventTemplate extends React.Component {
  static childContextTypes = {
    hostname: string,
    port: string
  }
  static propTypes = {
    data: shape({
      markdownRemark: shape({
        fields: shape({
          relativePath: string
        }),
        frontmatter: object
      }),
      site: shape({
        host: string,
        port: string
      })
    })
  }
  getChildContext () {
    const { data: { site: { host: hostname, port } } } = this.props
    return {
      hostname,
      port
    }
  }
  render () {
    const { data: { markdownRemark: post } } = this.props
    const { fields, frontmatter } = post
    return (
      <DefaultLayout pathname={fields.relativePath}>
        {frontmatter.title} ({frontmatter.meetup.id})
      </DefaultLayout>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        relativePath
      }
      frontmatter {
        meetup {
          id
        }
        schedule {
          duration
        }
        title
      }
    }
    site {
      host
      port
    }
  }
`
