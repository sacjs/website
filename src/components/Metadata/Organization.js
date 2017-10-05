import { arrayOf, object, shape, string } from 'prop-types'
import OrganizationBuilder from '../../builders/JSON-LD/Organization'
import Head from 'react-helmet'
import React from 'react'

const OrganizationMetadata = ({ organization }, context) => (
  <Head>
    <script type="application/ld+json">
      {JSON.stringify(OrganizationBuilder(organization, context))}
    </script>
  </Head>
)

OrganizationMetadata.contextTypes = {
  hostname: string.isRequired,
  port: string.isRequired
}

OrganizationMetadata.propTypes = {
  organization: shape({
    address: object,
    email: string.isRequired,
    logo: object,
    name: string.isRequired,
    pointOfContact: object,
    sameAs: arrayOf(string),
    url: string.isRequired
  })
}

export default OrganizationMetadata
