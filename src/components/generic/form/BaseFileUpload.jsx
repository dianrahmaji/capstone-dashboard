import { useCallback, useEffect, useState } from "react";
import { useField } from "formik";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { UploadIcon } from "@heroicons/react/solid";

import { storage, timestamp } from "~/config/firebase";
import useSelectedTeam from "~/hooks/useSelectedTeam";

// https://alexsidorenko.com/blog/react-list-rerender/
function FileItem({ file, onSuccessUpload, onDelete }) {
  const [percentage, setPercentage] = useState(0);
  const [storageDir, setStorageDir] = useState("");

  const {
    repository: { _id: repositoryId },
  } = useSelectedTeam();

  useEffect(() => {
    const uploadFile = () => {
      // TODO: Implement nested structure based on mongoDB
      const _storageDir = `/${repositoryId}/${timestamp.now().toMillis()}_${
        file.name
      }`;
      const storageRef = ref(storage, _storageDir);
      setStorageDir(_storageDir);

      const upload = uploadBytesResumable(storageRef, file);

      upload.on(
        "state_changed",
        (snapshot) => {
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
              name: file.name,
              url,
            });
          }),
      );
    };
    uploadFile();
  }, [file, repositoryId, onSuccessUpload]);

  const handleDelete = async () => {
    try {
      const storageRef = ref(storage, storageDir);

      await deleteObject(storageRef);

      onDelete();
      // eslint-disable-next-line no-empty
    } catch (_) {}
  };
  return (
    <div
      className="flex w-full appearance-none items-center justify-between rounded-md border p-2 text-gray-800 shadow-sm disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
      key={file.name}
    >
      <span className="text-gray-800">{file.name}</span>
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

function BaseFileUpload({ label, ...props }) {
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [field, meta, helpers] = useField(props);

  const { onBlur } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    setValue(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handdleSuccessUpload = useCallback((newFile) => {
    setInputValue((prevState) => [...prevState, newFile]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  const handleChange = (e) => {
    setFiles((prevState) => [...prevState, ...e.target.files]);
  };

  const handleDelete = (index) => {
    setInputValue((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });

    setFiles((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  return (
    <div className="mt-3">
      <div className="block text-sm font-medium text-gray-700">
        {label}{" "}
        <span className="font-normal italic">(*Accepted file type TBD)</span>
      </div>
      <label
        htmlFor={props.id || props.name}
        className="mt-1 block w-32 cursor-pointer text-sm font-medium text-gray-700"
      >
        <div className="flex items-center gap-2 rounded-md bg-primary p-2 pl-3 text-white hover:bg-accent hover:text-secondary">
          <div>Choose Files</div> <UploadIcon className="inline h-4 w-4" />
        </div>
        <input
          className="hidden"
          type="file"
          multiple
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
      </label>
      <div className="mt-2 text-sm text-gray-500" id="list">
        {files.map((file, index) => (
          <FileItem
            file={file}
            key={file.name}
            onSuccessUpload={handdleSuccessUpload}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      ) : null}
    </div>
  );
}

export default BaseFileUpload;
