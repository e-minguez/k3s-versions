import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import K3sIcon from '../images/icon-k3s.svg';
import RKE2Icon from '../images/icon-rke2.svg';

const K3sVersionsLink = () => (
  <div className="flex flex-row items-center">
    <K3sIcon className="h-9 pr-4" />
    <h1 className="text-3xl font-bold tracking-tight text-[#064a6e]">K3s versions</h1>
    <div className="ml-3 flex flex-col justify-center">
      <FontAwesomeIcon
        className="size-4 -mb-1 -mr-1 text-gray-400"
        aria-hidden="true"
        icon={faChevronUp}
      />
      <FontAwesomeIcon
        className="size-4 -mr-1 -mt-1 text-gray-400"
        aria-hidden="true"
        icon={faChevronDown}
      />
    </div>
  </div>
);

const RKE2VersionsLink = () => (
  <a href="https://eduardominguez.es/rke2-versions">
    <div className="flex flex-row items-center">
      <RKE2Icon className="h-9 pr-4" />
      <h1 className="text-3xl font-bold tracking-tight text-[#064a6e]">RKE2 versions</h1>
      <FontAwesomeIcon
        className="size-4 ml-3 text-gray-400"
        aria-hidden="true"
        icon={faArrowUpRightFromSquare}
      />
    </div>
  </a>
);

function HeaderLinkDropdown() {
  return (
    <Popover>
      <PopoverButton className="block rounded-lg border border-white p-3 hover:border hover:border-slate-400 hover:shadow focus:outline-none data-[open]:border-slate-400 data-[open]:shadow">
        <K3sVersionsLink />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom start"
        className="mt-3 divide-y divide-white/5 rounded-lg border border-slate-400 bg-white p-3 shadow transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] hover:bg-slate-100 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <RKE2VersionsLink />
      </PopoverPanel>
    </Popover>
  );
}

export default HeaderLinkDropdown;
