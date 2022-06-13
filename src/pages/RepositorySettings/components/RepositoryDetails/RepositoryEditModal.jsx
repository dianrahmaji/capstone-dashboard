import BaseInput from '~/components/generic/form/BaseInput'
import BaseTextArea from '~/components/generic/form/BaseTextArea'
import FormModal from '~/components/FormModal'

import { title, description, date, topic } from '~/utils/validation'

const RepositoryEditModal = props => {
  return (
    <FormModal
      title="Edit Repository"
      validation={{ title, description, date }}
      handleSubmit={console.log}
      {...props}
    >
      <BaseInput label="Title" name="title" type="text" />
      <div className="grid grid-cols-2 gap-3">
        <BaseInput label="Start Date" name="startDate" type="date" />
        <BaseInput label="End Date" name="endDate" type="date" />
      </div>
      <BaseTextArea label="Description" name="description" />
    </FormModal>
  )
}

export default RepositoryEditModal
