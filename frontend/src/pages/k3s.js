import React from "react";
import Layout from "../components/Layout";
import channelsJSON from "../../../data/channels.json";
import CommonHead from "../components/CommonHead";

const K3sVersionsPage = () => {
  const { data } = channelsJSON;
  return (
    <Layout>
      <main>
        <h1>Here are k3s versions</h1>
        <ul>
          {data.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
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
