import { useDispatch } from "react-redux";

import BaseInput from "~/components/generic/form/BaseInput";
import BaseMultipleInput from "~/components/generic/form/BaseMultipleInput";
import BaseTextArea from "~/components/generic/form/BaseTextArea";
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
      <BaseInput label="Team Name" name="name" type="text" />
      <BaseInput label="Repository Title" name="title" type="text" />
      <BaseMultipleInput label="Topics" name="topics" />
      <div className="grid grid-cols-2 gap-3">
        <BaseInput label="Start Date" name="startDate" type="date" />
        <BaseInput label="End Date" name="endDate" type="date" />
      </div>
      <BaseTextArea label="Description" name="description" />
    </FormModal>
  );
}

export default ProposalModal;
