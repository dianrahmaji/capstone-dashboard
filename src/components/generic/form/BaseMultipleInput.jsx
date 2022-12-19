import { useState } from "react";
import { useField } from "formik";
import clsx from "clsx";

function Badge({ value, handleDelete }) {
  return (
    <span className="mr-2 inline-flex items-center rounded bg-gray-200 py-0.5 pl-2 pr-1 text-xs font-medium text-gray-800">
      {value}
      <button
        type="button"
        className="ml-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-800 focus:bg-gray-800 focus:text-white focus:outline-none"
        onClick={handleDelete}
      >
        <span className="sr-only">Remove {value}</span>
        <svg
          className="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  );
}

function BaseMultipleInput({ label, ...props }) {
  const [currentValue, setCurrentValue] = useState("");
  const [field, meta, helpers] = useField(props);

  const { onBlur, value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  const handleAddValue = (e) => {
    if (e.keyCode === 32 && currentValue.length > 0) {
      setValue([...value, currentValue]);
      setCurrentValue("");
    }
  };

  const handleDelete = (index) => {
    const arr = [...value];
    arr.splice(index, 1);
    setValue(arr);
  };

  return (
    <div className="mt-3">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}{" "}
        <span className="font-normal">
          (pisahkan dengan <span className="italic">spasi</span>)
        </span>
      </label>
      <div className="mt-1">
        <input
          className={clsx(
            "block w-full appearance-none rounded-md border px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-primary disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm",
            { "": props.disabled },
          )}
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleAddValue}
          {...props}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500" id="list">
        {label}:{" "}
        {value.length > 0 ? (
          value.map((value, index) => (
            <Badge
              value={value}
              key={value}
              handleDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <span className="italic opacity-75">empty</span>
        )}
      </p>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      ) : null}
    </div>
  );
}

export default BaseMultipleInput;
