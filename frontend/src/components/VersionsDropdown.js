import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SubversionsModal from './SubversionsModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function VersionsDropdown({ versions = [] }) {
  const [firstVersion, ...olderVersions] = versions;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="relative inline-block w-full text-left">
      <div className="flex">
        <a
          className="bg-white text-gray-900 ring-gray-300 hover:bg-gray-50 w-full shrink-0 justify-center gap-x-1.5 rounded-md rounded-r-none px-3 py-2 text-left text-sm font-semibold shadow-sm ring-1 ring-inset"
          target="_blank"
          rel="noreferrer"
          href={firstVersion['github-release-link']}
        >
          {firstVersion.version}
        </a>
        <button
          disabled={!olderVersions.length}
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

      <SubversionsModal
        versions={olderVersions}
        isOpen={modalOpen}
        close={() => setModalOpen(false)}
      />

      {/* <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bg-white ring-black absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {olderVersions.map((version) => (
              <Menu.Item key={version.version}>
                {({ active }) => (
                  <div className="flex flex-row items-center justify-between">
                    <a
                      href={version['github-release-link']}
                      target="_blank"
                      rel="noreferrer"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {version.version}
                    </a>
                    {version.prerelease && (
                      <span className="bg-gray-50 text-gray-600 ring-gray-500/10 me-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                        pre-release
                      </span>
                    )}
                    {version.released}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition> */}
    </div>
  );
}
