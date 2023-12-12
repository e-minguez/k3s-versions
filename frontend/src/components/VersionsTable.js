import React from 'react';
// import { Link } from 'gatsby';
// import slugify from '@sindresorhus/slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import VersionsDropdown from '../components/VersionsDropdown';

const VersionsTable = ({ versions, versionDetailsData, lastUpdated, onOpen }) => {
  const versionsWithDetail = versionDetailsData.nodes.map((v) => v.parent.name);

  return (
    <div className="overflow-auto rounded-xl bg-[#ffde7a]">
      <div className="my-8 mb-0 overflow-hidden shadow-sm">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Version</Th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {versions.map((version) => (
              <tr key={version.name}>
                <Td>{version.name}</Td>
                <Td>
                  <VersionsDropdown version={version} />
                </Td>
                <Td className="text-right">
                  {/* {versionsWithDetail.includes(version.version) && (
                    <Link className="hover:underline" to={slugify(version.version)}>
                      <button className="text-white rounded-md bg-[#064a6e] px-2 py-1 text-sm shadow-sm hover:bg-[#006398]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> View Details
                      </button>
                    </Link>
                  )} */}
                  {versionsWithDetail.includes(version.version) && (
                    <button
                      onClick={() => onOpen(version.version)}
                      //   className="text-white rounded-md bg-[#064a6e] px-2 py-1 text-sm shadow-sm hover:bg-[#006398]"

                      className="justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} /> View Details
                    </button>
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
  <td className={`${className} border-b border-slate-200 p-3 pl-8 text-left text-slate-500`}>
    {children}
  </td>
);
