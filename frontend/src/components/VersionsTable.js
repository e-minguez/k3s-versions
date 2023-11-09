import React from 'react';
import { Link } from 'gatsby';
import slugify from '@sindresorhus/slugify';

const VersionsTable = ({ versions, versionDetailsData, lastUpdated }) => {
  const versionsWithDetail = versionDetailsData.nodes.map((v) => v.parent.name);

  return (
    <div className="overflow-auto rounded-xl bg-[#ffde7a]">
      <div className="my-8 mb-0 overflow-hidden shadow-sm">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Version</Th>
              <Th>Release notes</Th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {versions.map((version) => (
              <tr key={version.name}>
                <Td>{version.name}</Td>
                <Td>
                  <a
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    href={version['github-release-link']}
                  >
                    {version.version}
                  </a>
                </Td>
                <Td>
                  {versionsWithDetail.includes(version.version) ? (
                    <Link to={slugify(version.version)}>View Details</Link>
                  ) : (
                    '-'
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="pb-5 pr-5 pt-3 text-right text-sm font-light italic text-[#064a6e]">
        Last updated: {lastUpdated}
      </p>
    </div>
  );
};

export default VersionsTable;

const Th = ({ children }) => (
  <th className="border-b p-4 pb-3 pl-8 pt-0 text-left font-bold text-[#064a6e]">{children}</th>
);

const Td = ({ children }) => (
  <td className="border-slate-200 text-slate-500 border-b p-4 pl-8 text-left">{children}</td>
);
