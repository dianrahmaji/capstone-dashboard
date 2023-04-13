import { useDispatch } from "react-redux";

import BaseInput from "~/components/generic/form/BaseInput";
import BaseMultipleInput from "~/components/generic/form/BaseMultipleInput";
import TextEditorInput from "~/components/TextEditorInput";
import FormModal from "~/components/FormModal";

import { name, title, topics, description, date } from "~/utils/validation";
import { updateAcceptedTeam } from "~/store/actions/teamActions";

function ProposalModal(props) {
  const { setOpen } = props;
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateAcceptedTeam(values));
    setOpen(false);
  };

  return (
    <FormModal
      validation={{
        name,
        title,
        description,
        topics,
        startDate: date,
        endDate: date,
      }}
      handleSubmit={handleSubmit}
      {...props}
    >
      <BaseInput label="Nama Tim" name="name" type="text" />
      <BaseInput label="Judul Repositori" name="title" type="text" />
      <BaseMultipleInput label="Topik" name="topics" />
      <div className="grid grid-cols-2 gap-3">
        <BaseInput label="Tanggal Mulai" name="startDate" type="date" />
        <BaseInput label="Tanggal Selesai" name="endDate" type="date" />
      </div>
      <TextEditorInput label="Deskripsi" name="description" />
    </FormModal>
  );
}

export default ProposalModal;
