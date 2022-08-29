import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";
import TextEditorInput from "~/components/TextEditorInput";

import { title, note } from "~/utils/validation";

function FolderModal(props) {
  return (
    <FormModal validation={{ title, note }} {...props}>
      <BaseInput label="Folder Name" name="title" />
      <TextEditorInput label="Note" name="note" />
    </FormModal>
  );
}

export default FolderModal;
