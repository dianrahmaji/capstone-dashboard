import { useField } from 'formik'

const BaseCheckbox = ({ label, ...props }) => {
  const [field] = useField(props)

  return (
    <div className="flex items-center mt-3">
      <input
        className="h-4 w-4 text-primary focus:ring-accent border-gray-300 rounded"
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
  )
}

export default BaseCheckbox
