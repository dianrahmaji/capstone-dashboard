import { useCallback, useEffect, useRef, useState } from "react";
import { useField } from "formik";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { UploadIcon } from "@heroicons/react/solid";
import BaseInput from "~/components/generic/form/BaseInput";
import BaseMultipleInput from "~/components/generic/form/BaseMultipleInput";
import BaseTextArea from "~/components/generic/form/BaseTextArea";
import FormModal from "~/components/FormModal";

import {
  name,
  title,
  topics,
  description,
  date,
  document,
} from "~/utils/validation";
import { storage, timestamp } from "~/config/firebase";
import { splitNameAndExtension } from "~/utils/file";

// https://alexsidorenko.com/blog/react-list-rerender/
function FileItem({ file, location, onSuccessUpload, onDelete }) {
  const [percentage, setPercentage] = useState(0);
  const sizeRef = useRef(0);
  const storageDirRef = useRef("");

  useEffect(() => {
    const uploadFile = () => {
      // TODO: Implement nested structure based on mongoDB
      storageDirRef.current = `/${location}/${timestamp.now().toMillis()}_${
        file.name
      }`;
      const storageRef = ref(storage, storageDirRef.current);

      const upload = uploadBytesResumable(storageRef, file);

      upload.on(
        "state_changed",
        (snapshot) => {
          sizeRef.current = snapshot.totalBytes;
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setPercentage(percent);
        },
        // eslint-disable-next-line no-console
        (err) => console.log(err),
        () =>
          getDownloadURL(upload.snapshot.ref).then((url) => {
            onSuccessUpload({
              ...splitNameAndExtension(file.name),
              size: sizeRef.current,
              storageDir: storageDirRef.current,
              url,
            });
          }),
      );
    };
    uploadFile();
  }, [file, location, onSuccessUpload]);

  const handleDelete = async () => {
    try {
      const storageRef = ref(storage, storageDirRef.current);

      await deleteObject(storageRef);

      onDelete();
      // eslint-disable-next-line no-empty
    } catch (_) {}
  };
  return (
    <div className="flex w-full appearance-none items-center justify-between rounded-md border p-2 text-gray-800 shadow-sm disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm">
      <span className="text-gray-800">Dokumen Pengajuan Proyek Penelitian</span>
      <div>
        <span>{percentage}%</span>
        <button
          type="button"
          className="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-800 focus:bg-gray-800 focus:text-white focus:outline-none"
          onClick={handleDelete}
        >
          <span className="sr-only">Remove {file.name}</span>
          <svg
            className="h-2.5 w-2.5"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function BaseFileUpload({ label, location, ...props }) {
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [field, meta, helpers] = useField(props);

  const { onBlur, value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    if (typeof value !== "string") setValue(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuccessUpload = useCallback((newFile) => {
    setInputValue(newFile);
    setValue(newFile.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = () => {
    setInputValue(null);
    setFile(null);
    setValue(null);
  };

  return (
    <div className="mt-3">
      {!value && !file && (
        <>
          <div className="block text-sm font-medium text-gray-700">{label}</div>
          <label
            htmlFor={props.id || props.name}
            className="mt-1 block w-32 cursor-pointer text-sm font-medium text-gray-700"
          >
            <div className="flex items-center gap-2 rounded-md bg-primary p-2 pl-3 text-white hover:bg-accent hover:text-secondary">
              <div>Choose File</div>
              <UploadIcon className="inline h-4 w-4" />
            </div>
            <input
              className="hidden"
              type="file"
              onChange={handleChange}
              onBlur={handleBlur}
              {...props}
            />
          </label>
        </>
      )}
      <div className="mt-2 text-sm text-gray-500" id="list">
        {!file && value && (
          <div className="flex w-full appearance-none items-center justify-between rounded-md border p-2 text-gray-800 shadow-sm disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm">
            <span className="text-gray-800">
              Dokumen Pengajuan Proyek Penelitian
            </span>
            <div>
              <button
                type="button"
                className="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-800 focus:bg-gray-800 focus:text-white focus:outline-none"
                onClick={() => handleDelete()}
              >
                <svg
                  className="h-2.5 w-2.5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {file && (
          <FileItem
            file={file}
            location={location}
            onSuccessUpload={handleSuccessUpload}
            onDelete={() => handleDelete()}
          />
        )}
      </div>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      ) : null}
    </div>
  );
}

function ProposalModal(props) {
  return (
    <FormModal
      validation={{
        name,
        title,
        description,
        topics,
        startDate: date,
        endDate: date,
        document,
      }}
      title="Edit Pengajuan Proyek Penelitian"
      {...props}
    >
      <BaseInput label="Nama Tim" name="name" type="text" />
      <BaseInput label="Judul Repositori" name="title" type="text" />
      <BaseMultipleInput label="Topik" name="topics" />
      <div className="grid grid-cols-2 gap-3">
        <BaseInput label="Tanggal Mulai" name="startDate" type="date" />
        <BaseInput label="Tanggal Selesai" name="endDate" type="date" />
      </div>
      <BaseTextArea label="Deskripsi" name="description" />
      <BaseFileUpload
        label="Dokumen Pengajuan Proyek Penelitian"
        name="document"
        id="document"
        location="proposal"
      />
    </FormModal>
  );
}

export default ProposalModal;
