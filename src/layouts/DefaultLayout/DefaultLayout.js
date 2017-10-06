import { absoluteUrl } from '../../utils/urlFilters'
import Head from 'react-helmet'
import { externalUrls, organization, site, socialMedia } from '../../metadata'
import Metadata from '../../components/Metadata'
import { node, object, string } from 'prop-types'
import { organizationFromSite } from '../../transforms/Organization'
import React from 'react'

export default class DefaultLayout extends React.Component {
  static childContextTypes = {
    externalUrls: object,
    organization: object,
    path: string,
    site: object,
    socialMedia: object
  }
  static defaultProps = {
    breadcrumbs: false,
    externalUrls,
    organization,
    site,
    socialMedia
  }
  static propTypes = {
    children: node,
    externalUrls: object.isRequired,
    organization: object.isRequired,
    path: string.isRequired,
    site: object.isRequired,
    socialMedia: object.isRequired
  }
  getChildContext () {
    return {
      externalUrls: this.props.externalUrls,
      organization: this.props.organization,
      path: this.props.path,
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
          <link href={absoluteUrl(this.props.path)} rel="canonical"/>
          <link href={absoluteUrl('humans.txt')} rel="author"/>
        </Head>
        <Metadata.Site
          breadcrumbs={this.props.path === '/'}
          logo={organization.logo}
          path={this.props.path}
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
