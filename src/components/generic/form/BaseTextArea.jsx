import { useField } from "formik";

function BaseTextArea({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mt-3">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          className="block w-full appearance-none rounded-md border px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-primary disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default BaseTextArea;
