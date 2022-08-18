import BaseInput from '~/components/generic/form/BaseInput'
import FormModal from '~/components/FormModal'

import { documentName } from '~/utils/validation'

const DocumentModal = ({ action, type, ...props }) => {
  const uppercaseAction = `${action[0].toUpperCase()}${action.slice(1)}`
  const uppercaseType = `${type[0].toUpperCase()}${type.slice(1)}`

  return (
    <FormModal
      title={`${uppercaseAction} ${uppercaseType}`}
      validation={{ documentName }}
      handleSubmit={console.log}
      {...props}
    >
      <BaseInput label={`${uppercaseType} Name`} name="documentName" type="text" />
    </FormModal>
  )
}

export default DocumentModal
