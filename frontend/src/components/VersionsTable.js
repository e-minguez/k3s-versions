import React from 'react';
import { Link } from 'gatsby';
import slugify from '@sindresorhus/slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const VersionsTable = ({ versions, versionDetailsData, lastUpdated }) => {
  const versionsWithDetail = versionDetailsData.nodes.map((v) => v.parent.name);

  return (
    <div className="overflow-auto rounded-xl bg-[#ffde7a]">
      <div className="my-8 mb-0 overflow-hidden shadow-sm">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Latest version</Th>
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
                <Td className="text-right">
                  {versionsWithDetail.includes(version.version) && (
                    <Link className="hover:underline" to={slugify(version.version)}>
                      <button className="text-white rounded-md bg-[#064a6e] px-2 py-1 text-sm shadow-sm hover:bg-[#006398]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> View Details
                      </button>
                    </Link>
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

const Td = ({ children, className = '' }) => (
  <td className={`${className} border-slate-200 text-slate-500 border-b p-4 pl-8 text-left`}>
    {children}
  </td>
);
