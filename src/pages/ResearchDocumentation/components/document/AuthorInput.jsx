import { useState } from "react";
import { useField } from "formik";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

import { getProfileFromFullName } from "~/utils/text";

import BaseButton from "~/components/generic/button/BaseButton";
import AuthorAddModal from "./AuthorAddModal";

function Authors({ authors, onDelete }) {
  return (
    <div className="mt-3 text-sm text-gray-900 sm:col-span-2">
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {authors &&
          authors.map((author, index) => (
            <li key={author._id}>
              <div className="group relative flex items-center py-3 px-1">
                <div className="-m-1 block flex-1 p-1">
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
                        <span className="font-medium">{author.fullName}</span>
                      </div>
                      <p className="truncate text-sm text-gray-500">
                        {`${author.email}`}
                      </p>
                    </div>
                  </div>
                </div>
                <XIcon
                  className="h-5 w-5 rounded-md text-gray-400 hover:cursor-pointer hover:text-blue-700"
                  onClick={() => onDelete(index)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default function AuthorInput({ label, ...props }) {
  const [openAddAuthorModal, setOpenAddAuthorModal] = useState(false);

  const [field, meta, helpers] = useField(props);

  const { onBlur, value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  const handleAddAuthor = (newValue) => {
    setValue([...value, newValue]);
  };

  const handleDelete = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  };

  return (
    <div className="mt-3">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        Author(s)
      </label>
      <div onBlur={handleBlur}>
        <Authors authors={value} onDelete={handleDelete} />
        <BaseButton
          type="button"
          className="ml-auto mt-2 flex"
          onClick={() => setOpenAddAuthorModal(true)}
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          <span>Add Author</span>
        </BaseButton>
        <AuthorAddModal
          authors={value}
          onAddAuthor={handleAddAuthor}
          open={openAddAuthorModal}
          setOpen={setOpenAddAuthorModal}
        />
      </div>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}
