import React from 'react';
import Layout from '../components/Layout';
import k3sVersionsJSON from '../../../data/k3s.json';
import CommonHead from '../components/CommonHead';

const K3sVersionsPage = () => {
  const versions = k3sVersionsJSON['k3s-versions'];
  console.log('k3sVersionsJSON', k3sVersionsJSON['k3s-versions']);
  return (
    <Layout>
      <main>
        <h1 className="text-white bg-jungleGreen px-4 py-2">Here are k3s versions</h1>
        <ul>
          {versions.map((version) => (
            <li key={version.name}>{version.name}</li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export const Head = () => (
  <CommonHead>
    <title>K3s versions</title>
    <meta name="description" content="A list of available K3s versions" />
  </CommonHead>
);

export default K3sVersionsPage;
