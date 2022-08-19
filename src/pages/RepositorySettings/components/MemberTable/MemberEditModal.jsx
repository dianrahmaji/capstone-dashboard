import BaseInput from "~/components/generic/form/BaseInput";
import BaseSelect from "~/components/generic/form/BaseSelect";
import FormModal from "~/components/FormModal";

import { fullName, role } from "~/utils/validation";

function MemberEditModal(props) {
  return (
    <FormModal
      title="Edit Member"
      validation={{ fullName, role }}
      handleSubmit={console.log}
      {...props}
    >
      <BaseInput label="Full Name" name="fullName" type="text" disabled />
      <BaseSelect label="Role" name="role">
        <option value="frontend">Frontend Engineer</option>
        <option value="backend">Backend Engineer</option>
      </BaseSelect>
    </FormModal>
  );
}

export default MemberEditModal;
