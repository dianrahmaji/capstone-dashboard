import clsx from "clsx";

import { toLocaleFormat } from "~/utils/date";
import { capitalizeFirstLetter, getProfileFromFullName } from "~/utils/text";

import BaseButton from "~/components/generic/button/BaseButton";
import BaseModal from "~/components/generic/modal/BaseModal";

export default function InfoModal({ item, onOpenEditModal, ...props }) {
  const { createdAt, description, status, updatedAt, authors } = item;

  return (
    <BaseModal title="IMG_4985.HEIC" {...props}>
      <div className="px-4 py-5 sm:px-0 sm:pt-0">
        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
              Created At
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {toLocaleFormat(createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
              Last Modified
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {toLocaleFormat(updatedAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
              Description
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {description}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
              Status
            </dt>
            <dd className="mt-1 flex items-center gap-1 text-sm text-gray-900 sm:col-span-2">
              {capitalizeFirstLetter(status)}{" "}
              <span
                className={clsx(
                  {
                    "bg-blue-400": status === "ongoing", // Ongoing
                    "bg-green-400": status === "done", // Done
                    "bg-yellow-400": status === "draft", // Draft
                    "bg-red-400": status === "critical", // Abandoned / Critical
                  },

                  "  mt-0.5 h-2.5 w-2.5 rounded-full",
                )}
                aria-hidden="true"
              />
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
              Author(s)
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                {authors &&
                  authors.map((author) => (
                    <li key={author._id}>
                      <div className="group relative flex items-center py-3 px-1">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="-m-1 block flex-1 p-1">
                          <div
                            className="absolute inset-0 group-hover:bg-gray-50"
                            aria-hidden="true"
                          />
                          <div className="relative flex min-w-0 flex-1 items-center">
                            <span className="relative inline-block shrink-0">
                              {author.pictureUrl ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              ) : (
                                <div className="my-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                  <div className=" text-sm text-primary">
                                    {getProfileFromFullName(author.fullName)}
                                  </div>
                                </div>
                              )}
                            </span>
                            <div className="ml-4 truncate">
                              <div className="flex shrink-0 justify-between truncate text-sm">
                                <span className="font-medium">
                                  {author.fullName}
                                </span>
                              </div>
                              <p className="truncate text-sm text-gray-500">
                                {`${author.email}`}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </li>
                  ))}
              </ul>
            </dd>
          </div>
        </dl>
        <BaseButton
          className="mt-5 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none sm:col-start-2 sm:text-sm"
          onClick={onOpenEditModal}
        >
          Edit Details
        </BaseButton>
      </div>
    </BaseModal>
  );
}
