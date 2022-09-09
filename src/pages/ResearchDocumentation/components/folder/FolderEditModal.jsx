import { useDispatch } from "react-redux";

import { updateFolder } from "~/store/actions/folderActions";
import { name, status, description } from "~/utils/validation";

import BaseInput from "~/components/generic/form/BaseInput";
import BaseSelect from "~/components/generic/form/BaseSelect";
import BaseTextArea from "~/components/generic/form/BaseTextArea";
import FormModal from "~/components/FormModal";

export default function FolderEditModal({ setOpen, type, ...props }) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { _id: folderId, name, description, status } = values;
    dispatch(updateFolder({ folderId, type, name, description, status }));
    setOpen(false);
  };
  return (
    <FormModal
      title="Edit Folder Info"
      validation={{ name, status, description }}
      handleSubmit={handleSubmit}
      setOpen={setOpen}
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
