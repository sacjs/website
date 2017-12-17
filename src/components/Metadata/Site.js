import { absoluteUrl } from '../../utils/urlFilters'
import { bool, object, string } from 'prop-types'
import BreadcrumbListBuilder from '../../builders/JSON-LD/BreadcrumbList'
import Head from 'react-helmet'
import React from 'react'

const SiteMetadata = ({
  breadcrumbs,
  description,
  logo,
  slug,
  siteName,
  themeColor,
  title
}) => {
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
      {/* <meta content={siteName} name="apple-mobile-web-app-title"/>
      <meta content={siteName} name="application-name"/>
      <link
        href="/img/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link href="/img/favicons/favicon-16x16.png" rel="shortcut icon"/>
      <link
        color={themeColor}
        href="/img/favicons/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <meta content={siteName} property="og:site_name"/>
      <meta content={title} property="og:title"/>
      <meta content="website" property="og:type"/>
      <meta content={absoluteUrl(slug)} property="og:url"/> */}
      <meta
        content="https://avatars1.githubusercontent.com/u/6962987?s=400&amp;v=4"
        property="og:image"
      />
      {/* <meta content={absoluteUrl(logo.url)} property="og:image"/> */}
      {/* <meta content={logo.width} property="og:image:width"/> */}
      {/* <meta content={logo.height} property="og:image:height"/> */}
      {/* <meta content={description} property="twitter:description"/> */}
      {/* {breadcrumbsLD} */}
    </Head>
  )
}

SiteMetadata.propTypes = {
  breadcrumbs: bool,
  description: string.isRequired,
  logo: object,
  siteName: string,
  slug: string.isRequired,
  themeColor: string,
  title: string.isRequired
}

export default SiteMetadata
