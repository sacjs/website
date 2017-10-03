import { absoluteUrl } from '../../utils/urlFilters'
import Head from 'react-helmet'
import * as metadata from '../../metadata'
import { node, object, shape, string } from 'prop-types'
import React from 'react'

export default class DefaultLayout extends React.Component {
  static childContextTypes = {
    metadata: shape({
      externalUrls: object,
      organization: object,
      site: object,
      socialMedia: object
    })
  }
  static contextTypes = {
    hostname: string.isRequired,
    port: string.isRequired
  }
  static defaultProps = {
    metadata
  }
  static propTypes = {
    children: node,
    metadata: shape({
      externalUrls: object.isRequired,
      organization: object.isRequired,
      site: object.isRequired,
      socialMedia: object.isRequired
    }),
    pathname: string
  }
  getChildContext () {
    return {
      metadata: this.props.metadata
    }
  }
  render () {
    const { site } = this.props.metadata
    return (
      <div>
        <Head>
          <html lang="en"/>
          <meta content="text/html;charSet=UTF-8" httpEquiv="Content-type"/>
          <link href="/img/favicons/favicon.ico" rel="shortcut icon"/>
          <meta content={site.title} name="apple-mobile-web-app-title"/>
          <meta content={site.title} name="application-name"/>
          <title>{site.title}</title>
          <meta
            content={`${site.title}: ${site.description}`}
            name="description"
          />
          <link href={absoluteUrl('humans.txt', this.context)} rel="author"/>
          <link
            href={absoluteUrl(this.props.pathname, this.context)}
            rel="canonical"
          />
        </Head>
        {this.props.children}
      </div>
    )
  }
}
