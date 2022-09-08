import BaseInput from "~/components/generic/form/BaseInput";
import BaseSelect from "~/components/generic/form/BaseSelect";
import FormModal from "~/components/FormModal";

import { name, status, description } from "~/utils/validation";
import BaseTextArea from "~/components/generic/form/BaseTextArea";

export default function FolderEditModal(props) {
  const handleSubmit = () => {};
  return (
    <FormModal
      title="Edit Folder Info"
      validation={{ name, status, description }}
      handleSubmit={handleSubmit}
      {...props}
    >
      <BaseInput label="Name" name="name" type="text" />
      <BaseSelect label="Status" name="status">
        <option value="" disabled defaultValue>
          Select current status
        </option>
        <option value="ongoing">Ongoing</option>
        <option value="draft">Draft</option>
        <option value="done">Done</option>
        <option value="critical">Critical</option>
      </BaseSelect>
      <BaseTextArea label="Description" name="description" />
    </FormModal>
  );
}
