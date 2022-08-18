import { useField } from 'formik'
import ReactQuill from '~/components/ReactQuill'

const TextEditorInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  const { onBlur, value } = field
  const { touched, error } = meta
  const { setValue } = helpers

  const handleBlur = () => {
    onBlur({ target: { name: props.name } })
  }

  return (
    <div className="mt-3">
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <ReactQuill value={value} onBlur={handleBlur} setValue={setValue} />
      </div>
      {touched && error ? <div className="mt-1 text-xs text-red-500">{meta.error}</div> : null}
    </div>
  )
}

export default TextEditorInput
