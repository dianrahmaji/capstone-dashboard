import BaseInput from '~/components/generic/form/BaseInput'
import FormModal from '~/components/FormModal'

import { documentName } from '~/utils/validation'

const RenameModal = props => {
  return (
    <FormModal
      title="Rename"
      validation={{ documentName }}
      handleSubmit={console.log}
      {...props}
    >
      <BaseInput label="Document Name" name="documentName" type="text" />
    </FormModal>
  )
}

export default RenameModal
