import { useField } from "formik";

function BaseCheckbox({ label, ...props }) {
  const [field] = useField(props);

  return (
    <div className="mt-3 flex items-center">
      <input
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-accent disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
        type="checkbox"
        {...field}
        {...props}
      />
      <label
        htmlFor={props.id || props.name}
        className="ml-2 block text-sm text-gray-900"
      >
        {label}
      </label>
    </div>
  );
}

export default BaseCheckbox;
