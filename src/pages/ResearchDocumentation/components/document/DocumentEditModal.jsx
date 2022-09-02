import BaseTextArea from "~/components/generic/form/BaseTextArea";
import FormModal from "~/components/FormModal";

import { craftingTime, description, name, status } from "~/utils/validation";
import BaseInput from "~/components/generic/form/BaseInput";
import BaseSelect from "~/components/generic/form/BaseSelect";

export default function DocumentEditModal(props) {
  return (
    <FormModal
      title="Edit Document"
      validation={{ craftingTime, description, name, status }}
      initialValues={{
        craftingTime: 0,
        description: "",
        name: "",
        status: "ongoing",
      }}
      {...props}
    >
      <BaseInput label="Name" name="name" type="text" />
      <BaseInput
        label="Crafting Time (Hours)"
        name="craftingTime"
        type="number"
      />
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
      {/* TODO: Add authors */}
      {/* TODO: Add file */}
    </FormModal>
  );
}
