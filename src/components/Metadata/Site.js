import { absoluteUrl } from '../../utils/urlFilters'
import { bool, object, string } from 'prop-types'
import BreadcrumbListBuilder from '../../builders/JSON-LD/BreadcrumbList'
import Head from 'react-helmet'
import React from 'react'

const SiteMetadata = ({ breadcrumbs, path, logo, title }) => {
  let breadcrumbsLD = ''
  if (breadcrumbs) {
    breadcrumbsLD = (
      <script id="breadcrumbs" type="application/ld+json">
        {JSON.stringify(
          BreadcrumbListBuilder([
            // TODO: Add flag to frontmatter of relevant pages
            {
              name: 'Code of Conduct',
              url: '/code-of-conduct'
            },
            {
              name: 'Speaking',
              url: '/speaking'
            },
            {
              name: 'Sponsorship',
              url: '/sponsorship'
            }
          ])
        )}
      </script>
    )
  }
  return (
    <Head>
      <meta content={title} property="og:site_name"/>
      <meta content="website" property="og:type"/>
      <meta content={absoluteUrl(path)} property="og:url"/>
      <meta content={absoluteUrl(logo.url)} property="og:image"/>
      <meta content={logo.width} property="og:image:width"/>
      <meta content={logo.height} property="og:image:height"/>
      {breadcrumbsLD}
    </Head>
  )
}

SiteMetadata.propTypes = {
  breadcrumbs: bool,
  logo: object,
  path: string,
  title: string
}

export default SiteMetadata
