import { useDispatch } from "react-redux";

import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";

import { title, description } from "~/utils/validation";
import { createFolder } from "~/store/actions/folderActions";
import BaseTextArea from "~/components/generic/form/BaseTextArea";

function FolderModal(props) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(createFolder(values));
  };
  return (
    <FormModal
      validation={{ title, description }}
      handleSubmit={handleSubmit}
      {...props}
    >
      <BaseInput label="Folder Name" name="title" />
      <BaseTextArea label="Description" name="description" />
    </FormModal>
  );
}

export default FolderModal;
