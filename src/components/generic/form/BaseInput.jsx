import { useField } from 'formik'
import clsx from 'clsx'

const BaseInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="mt-3">
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          className={clsx(
            'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none',
            { '': props.disabled }
          )}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default BaseInput
