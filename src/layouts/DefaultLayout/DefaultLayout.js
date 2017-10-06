import { absoluteUrl } from '../../utils/urlFilters'
import { bool, node, object, string } from 'prop-types'
import Head from 'react-helmet'
import { externalUrls, organization, site, socialMedia } from '../../metadata'
import Metadata from '../../components/Metadata'
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
    externalUrls,
    organization,
    site,
    socialMedia
  }
  static propTypes = {
    breadcrumbs: bool,
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
          <title>
            {site.title}: {site.description}
          </title>
          <meta
            content={`${site.title}: ${site.description}`}
            name="description"
          />
          <link href={absoluteUrl(this.props.path)} rel="canonical"/>
          <link href="/humans.txt" rel="author"/>
        </Head>
        <Metadata.Site
          breadcrumbs={this.props.breadcrumbs}
          logo={organization.logo}
          path={this.props.path}
          themeColor={this.props.site.themeColor}
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
