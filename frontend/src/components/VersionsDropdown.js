import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SubversionsModal from './SubversionsModal';

export default function VersionsDropdown({ version }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="relative inline-block w-full text-left">
      <div className="flex">
        <a
          className="w-full shrink-0 justify-center gap-x-1.5 rounded-md rounded-r-none bg-white px-3 py-2 text-left text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          target="_blank"
          rel="noreferrer"
          href={version['github-release-link']}
        >
          {version.version}
        </a>
        <button
          className="-ml-px inline-flex w-full justify-center gap-x-1.5 rounded-md rounded-l-none bg-white px-3 py-2 pl-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          title="Older versions"
          onClick={() => setModalOpen(true)}
        >
          <FontAwesomeIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
            icon={faChevronDown}
          />
        </button>
      </div>

      <SubversionsModal
        versions={version['all-versions']}
        isOpen={modalOpen}
        close={() => setModalOpen(false)}
      />
    </div>
  );
}
