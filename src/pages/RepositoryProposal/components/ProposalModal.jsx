import BaseInput from '~/components/generic/form/BaseInput'
import BaseTextArea from '~/components/generic/form/BaseTextArea'
import FormModal from '~/components/FormModal'

import { title, description } from '~/utils/validation'

const ProposalModal = props => {
  return (
    <FormModal validation={{ title, description }} {...props}>
      <BaseInput label="Title" name="title" type="text" />
      <BaseTextArea label="Description" name="description" />
    </FormModal>
  )
}

export default ProposalModal
