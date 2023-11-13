import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SubversionsModal from './SubversionsModal';

export default function VersionsDropdown({ versions = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="relative inline-block w-full text-left">
      <div className="flex">
        <a
          className="bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 w-full shrink-0 justify-center gap-x-1.5 rounded-md rounded-r-none px-3 py-2 text-left text-sm font-semibold shadow-sm ring-1 ring-inset"
          target="_blank"
          rel="noreferrer"
          href={versions[0]['github-release-link']}
        >
          {versions[0].version}
        </a>
        <button
          className="bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 -ml-px inline-flex w-full justify-center gap-x-1.5 rounded-md rounded-l-none px-3 py-2 pl-2 text-sm font-semibold shadow-sm ring-1 ring-inset"
          title="Older versions"
          onClick={() => setModalOpen(true)}
        >
          <FontAwesomeIcon
            className="text-gray-400 -mr-1 h-5 w-5"
            aria-hidden="true"
            icon={faChevronDown}
          />
        </button>
      </div>

      <SubversionsModal versions={versions} isOpen={modalOpen} close={() => setModalOpen(false)} />
    </div>
  );
}
