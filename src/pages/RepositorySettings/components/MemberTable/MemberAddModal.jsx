import BaseSelect from '~/components/generic/form/BaseSelect'
import FormModal from '~/components/FormModal'

import { fullName, role } from '~/utils/validation'

const MemberAddModal = props => {
  return (
    <FormModal
      title="Add Member"
      initialValues={{ fullName: '', role: '' }}
      validation={{ fullName, role }}
      handleSubmit={console.log}
      {...props}
    >
      <BaseSelect label="Full Name" name="fullName">
        <option value="1">Dian Rahmaji</option>
        <option value="2">Dzakiy Harissalam</option>
      </BaseSelect>
      <BaseSelect label="Role" name="role">
        <option value="frontend">Frontend Engineer</option>
        <option value="backend">Backend Engineer</option>
      </BaseSelect>
    </FormModal>
  )
}

export default MemberAddModal
