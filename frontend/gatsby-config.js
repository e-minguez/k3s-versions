/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `K3s Versions`,
    siteUrl: `https://www.eduardominguez.es/k3s-versions`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `versionDetails`,
        path: `${__dirname}/../data`,
        ignore: [`**/\.*`, `**/*\.json`],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `k3sVersions`,
        path: `${__dirname}/../data`,
        ignore: [`**/\.*`, `**/*\.md`],
      },
    },
    'gatsby-transformer-remark',
  ],
  pathPrefix: '/k3s-versions',
};
