import { useDispatch } from "react-redux";

import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";
import TextEditorInput from "~/components/TextEditorInput";

import { title, note } from "~/utils/validation";
import { createFolder } from "~/store/actions/folderActions";

function FolderModal(props) {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(createFolder(values));
  };
  return (
    <FormModal
      validation={{ title, note }}
      handleSubmit={handleSubmit}
      {...props}
    >
      <BaseInput label="Folder Name" name="title" />
      <TextEditorInput label="Note" name="note" />
    </FormModal>
  );
}

export default FolderModal;
