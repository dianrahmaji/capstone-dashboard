import { title, note, files } from "~/utils/validation";

import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";
import TextEditorInput from "~/components/TextEditorInput";
import BaseFileUpload from "~/components/generic/form/BaseFileUpload";

function DocumentModal({ setOpen, ...props }) {
  const handleSubmit = async (values) => {
    // TODO: API call to Add Documents Here
    // eslint-disable-next-line no-console
    console.log(values);
    setOpen(false);
  };
  return (
    <FormModal
      validation={{ title, note, files }}
      handleSubmit={handleSubmit}
      setOpen={setOpen}
      {...props}
    >
      <BaseInput label="Document Name" name="title" />
      <TextEditorInput label="Note" name="note" />
      <BaseFileUpload label="Documents" name="files" id="files" />
    </FormModal>
  );
}

export default DocumentModal;
