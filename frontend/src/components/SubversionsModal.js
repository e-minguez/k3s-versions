import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function SubversionsModal({ versions, close, isOpen }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="p-6">
                  <table className="w-full table-auto border-collapse text-sm">
                    <thead>
                      <tr>
                        <th>Version</th>
                        <th>Pre-release</th>
                        <th>Release date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {versions.map((version) => (
                        <tr key={version.version}>
                          <td>
                            <a
                              href={version['github-release-link']}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-700 block px-4 py-2 pl-0 text-sm hover:underline"
                            >
                              {version.version}
                            </a>
                          </td>
                          <td>
                            {version.prerelease && (
                              <span className="bg-gray-50 text-gray-600 ring-gray-500/10 me-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                                pre-release
                              </span>
                            )}
                          </td>
                          <td className="text-gray-700 block px-4 py-2 pl-0 text-sm">
                            {version.released}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
