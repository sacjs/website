export function organizationFromSite (organization, site, socialMedia) {
  return {
    address: organization.location,
    email: socialMedia.email.address,
    logo: organization.logo,
    name: site.title,
    pointOfContact: {
      email: socialMedia.email.address,
      url: site.url
    },
    sameAs: [
      `https://github.com/${socialMedia.github.username}`,
      `https://twitter.com/${socialMedia.twitter.username}`,
      `https://meetup.com/${socialMedia.meetup.groupName}`,
      socialMedia.slack.url
    ],
    url: site.url
  }
}
