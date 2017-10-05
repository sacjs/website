import { absoluteUrl } from '../../utils/urlFilters'
import Head from 'react-helmet'
import { externalUrls, organization, site, socialMedia } from '../../metadata'
import Metadata from '../../components/Metadata'
import { organizationFromSite } from '../../transforms/Organization'
import { node, object, string } from 'prop-types'
import React from 'react'

export default class DefaultLayout extends React.Component {
  static childContextTypes = {
    externalUrls: object,
    organization: object,
    site: object,
    socialMedia: object
  }
  static contextTypes = {
    hostname: string.isRequired,
    port: string.isRequired
  }
  static defaultProps = {
    externalUrls,
    organization,
    site,
    socialMedia
  }
  static propTypes = {
    children: node,
    externalUrls: object.isRequired,
    organization: object.isRequired,
    pathname: string,
    site: object.isRequired,
    socialMedia: object.isRequired
  }
  getChildContext () {
    return {
      externalUrls: this.props.externalUrls,
      organization: this.props.organization,
      site: this.props.site,
      socialMedia: this.props.socialMedia
    }
  }
  render () {
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
        <Metadata.Site
          logo={organization.logo}
          path={this.props.pathname}
          title={site.title}
        />
        <Metadata.Organization
          organization={organizationFromSite(organization, site, socialMedia)}
        />
        {this.props.children}
      </div>
    )
  }
}
