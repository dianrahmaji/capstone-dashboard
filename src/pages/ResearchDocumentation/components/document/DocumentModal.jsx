import { title, note, files } from "~/utils/validation";

import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";
import TextEditorInput from "~/components/TextEditorInput";
import BaseFileUpload from "~/components/generic/form/BaseFileUpload";

function DocumentModal(props) {
  return (
    <FormModal validation={{ title, note, files }} {...props}>
      <BaseInput label="Document Name" name="title" />
      <TextEditorInput label="Note" name="note" />
      <BaseFileUpload label="Documents" name="files" id="files" />
    </FormModal>
  );
}

export default DocumentModal;
