import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";

import { name, description } from "~/utils/validation";
import { createFolder } from "~/store/actions/folderActions";
import BaseTextArea from "~/components/generic/form/BaseTextArea";

function FolderModal({ setOpen, ...props }) {
  const dispatch = useDispatch();
  const { folderId: parentId } = useParams();
  const { _id: authorId } = useSelector((state) => state.user.data);

  const handleSubmit = (values) => {
    dispatch(createFolder({ ...values, parentId, authorId }));
    setOpen(false);
  };
  return (
    <FormModal
      validation={{ name, description }}
      handleSubmit={handleSubmit}
      setOpen={setOpen}
      {...props}
    >
      <BaseInput label="Folder Name" name="name" />
      <BaseTextArea label="Description" name="description" />
    </FormModal>
  );
}

export default FolderModal;
