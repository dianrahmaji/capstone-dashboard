import { useState, useMemo } from "react";
import { useField } from "formik";
import { ExternalLinkIcon, PlusIcon, XIcon } from "@heroicons/react/solid";

import { getFileIcon } from "~/utils/file";

import BaseButton from "~/components/generic/button/BaseButton";
import ReferenceAddModal from "./ReferenceAddModal";

function ReferenceEntry({ reference, handleDelete }) {
  const FileIcon = useMemo(
    () => getFileIcon(reference.extension),
    [reference.extension],
  );

  return (
    <li>
      <div className="group relative flex items-center justify-center py-3 px-1">
        <div className="-m-1 block flex-1 p-1">
          <div className="relative flex min-w-0 flex-1 items-center">
            <span className="relative inline-block shrink-0">
              <FileIcon className="h-8 w-8" />
            </span>
            <div className="ml-4 truncate">
              <div className="flex shrink-0 justify-between truncate text-sm">
                <span className="font-bold text-primary">
                  {reference.name}.{reference.extension}
                </span>
              </div>
              <p className="truncate text-sm text-gray-500">
                {reference.folders.parent.length > 0 &&
                  `${
                    reference.folders.parent.sort(
                      (a, b) => b.level - a.level,
                    )[0]?.name
                  } > `}
                {reference.folders.parent.length > 1 && "... > "}
                {reference.folders.name}
              </p>
            </div>
          </div>
        </div>
        <ExternalLinkIcon
          className="h-5 w-5 cursor-pointer hover:text-accent"
          onClick={() => window.open(reference.url)}
        />
        <XIcon
          className="ml-3 h-5 w-5 rounded-md text-gray-400 hover:cursor-pointer hover:text-red-700"
          onClick={handleDelete}
        />
      </div>
    </li>
  );
}

function References({ references, onDelete }) {
  return (
    <div className="mt-3 text-sm text-gray-900 sm:col-span-2">
      <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {references &&
          references.map((r, index) => (
            <ReferenceEntry
              key={r._id}
              reference={r}
              handleDelete={() => onDelete(index)}
            />
          ))}
      </ul>
    </div>
  );
}

export default function ReferenceInput({ label, ...props }) {
  const [openAddReferenceModal, setOpenAddReferenceModal] = useState(false);

  const [field, meta, helpers] = useField(props);

  const { onBlur, value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  const handleAddReference = (newValue) => {
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
        {label}
      </label>
      <div onBlur={handleBlur}>
        <References references={value} onDelete={handleDelete} />
        <BaseButton
          type="button"
          className="ml-auto mt-2 flex"
          onClick={() => setOpenAddReferenceModal(true)}
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          <span>Tambah Referensi</span>
        </BaseButton>
        <ReferenceAddModal
          references={value}
          onAddReference={handleAddReference}
          open={openAddReferenceModal}
          setOpen={setOpenAddReferenceModal}
        />
      </div>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}
