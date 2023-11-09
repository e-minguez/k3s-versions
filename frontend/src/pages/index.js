import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import k3sVersionsJSON from '../../../data/k3s.json';
import CommonHead from '../components/CommonHead';
import VersionsTable from '../components/VersionsTable';

export const versionDetailsQuery = graphql`
  query VersionDetailsQuery {
    versionDetails: allMarkdownRemark {
      nodes {
        id
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
`;

const K3sVersionsPage = ({ data }) => {
  const versions = k3sVersionsJSON['k3s-versions'];
  return (
    <Layout>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <VersionsTable
          versions={versions}
          versionDetailsData={data.versionDetails}
          lastUpdated={k3sVersionsJSON.date}
        />
      </div>
    </Layout>
  );
};

export const Head = () => (
  <CommonHead>
    <meta name="description" content="A list of available K3s versions" />
  </CommonHead>
);

export default K3sVersionsPage;
