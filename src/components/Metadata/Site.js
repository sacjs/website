import { absoluteUrl } from '../../utils/urlFilters'
import BreadcrumbListBuilder from '../../builders/JSON-LD/BreadcrumbList'
import Head from 'react-helmet'
import { object, string } from 'prop-types'
import React from 'react'

const SiteMetadata = ({ path, logo, title }, context) => (
  <Head>
    <meta content={title} property="og:site_name"/>
    <meta content="website" property="og:type"/>
    <meta content={absoluteUrl(path, context)} property="og:url"/>
    <meta content={absoluteUrl(logo.url, context)} property="og:image"/>
    <meta content={logo.width} property="og:image:width"/>
    <meta content={logo.height} property="og:image:height"/>
    <script type="application/ld+json">
      {JSON.stringify(
        BreadcrumbListBuilder(
          [
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
          ],
          context
        )
      )}
    </script>
  </Head>
)

SiteMetadata.contextTypes = {
  hostname: string.isRequired,
  port: string.isRequired
}

SiteMetadata.propTypes = {
  logo: object,
  path: string,
  title: string
}

export default SiteMetadata
