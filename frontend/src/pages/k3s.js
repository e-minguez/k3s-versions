import React from 'react';
import Layout from '../components/Layout';
import k3sVersionsJSON from '../../../data/k3s.json';
import CommonHead from '../components/CommonHead';
import VersionsTable from '../components/VersionsTable';
import K3sIcon from '../images/icon-k3s.svg';

const K3sVersionsPage = () => {
  const versions = k3sVersionsJSON['k3s-versions'];
  return (
    <Layout>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center">
            <K3sIcon className="h-9 pr-4" />
            <h1 className="text-3xl font-bold tracking-tight text-[#064a6e]">K3s versions</h1>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <VersionsTable versions={versions} lastUpdated={k3sVersionsJSON.date} />
        </div>
      </main>
    </Layout>
  );
};

export const Head = () => (
  <CommonHead>
    <title>K3s | Versions</title>
    <meta name="description" content="A list of available K3s versions" />
  </CommonHead>
);

export default K3sVersionsPage;
