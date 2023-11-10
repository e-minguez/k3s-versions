import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import CommonHead from '../components/CommonHead';
import MarkdownContent from '../components/MarkdownContent';

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      parent {
        ... on File {
          name
        }
      }
      html
    }
  }
`;

const VersionDetailPage = ({ data }) => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl py-2 text-sm sm:px-6 lg:px-8">
        <Link to="/" className="underline hover:no-underline">
          K3s Versions
        </Link>{' '}
        &gt; {data.markdownRemark.parent.name}
      </div>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl">{data.markdownRemark.parent.name}</h1>
        <MarkdownContent content={data.markdownRemark.html} />
      </div>
    </Layout>
  );
};

export const Head = ({ data }) => (
  <CommonHead title={data.markdownRemark.parent.name}>
    <meta name="description" content="Version details" />
  </CommonHead>
);

export default VersionDetailPage;
