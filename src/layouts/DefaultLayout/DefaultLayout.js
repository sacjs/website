import { absoluteUrl } from '../../utils/urlFilters'
import { bool, node, object, string } from 'prop-types'
import './DefaultLayout.css'
import Head from 'react-helmet'
import { externalUrls, organization, site, socialMedia } from '../../metadata'
import Metadata from '../../components/Metadata'
import { organizationFromSite } from '../../transforms/Organization'
import React from 'react'
import VerticalRhythmGrid from '../../components/VerticalRhythmGrid'

export default class DefaultLayout extends React.Component {
  static childContextTypes = {
    externalUrls: object,
    organization: object,
    site: object,
    slug: string,
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
    pageDescription: string,
    pageTitle: string,
    site: object.isRequired,
    slug: string.isRequired,
    socialMedia: object.isRequired
  }
  getChildContext () {
    return {
      externalUrls: this.props.externalUrls,
      organization: this.props.organization,
      site: this.props.site,
      slug: this.props.slug,
      socialMedia: this.props.socialMedia
    }
  }
  render () {
    const description =
      this.props.pageDescription || `${site.title}: ${site.description}`
    const title = `${site.title}: ${this.props.pageTitle || site.description}`
    return (
      <div>
        <Head>
          <html lang="en"/>
          <meta content="text/html;charSet=UTF-8" httpEquiv="Content-type"/>
          <meta content="ie=edge" httpEquiv="x-ua-compatible"/>
          <title>{title}</title>
          <meta content={description} name="description"/>
          <meta
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            name="viewport"
          />
          <link href={absoluteUrl(this.props.slug)} rel="canonical"/>
          <link href="/humans.txt" rel="author"/>
        </Head>
        <VerticalRhythmGrid/>
        <Metadata.Site
          breadcrumbs={this.props.breadcrumbs}
          description={this.props.pageDescription}
          logo={organization.logo}
          siteName={site.title}
          slug={this.props.slug}
          themeColor={this.props.site.themeColor}
          title={this.props.pageTitle || site.description}
        />
        <Metadata.Organization
          organization={organizationFromSite(organization, site, socialMedia)}
        />
        {this.props.children}
      </div>
    )
  }
}
