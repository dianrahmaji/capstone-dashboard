import { useDispatch } from "react-redux";

import BaseInput from "~/components/generic/form/BaseInput";
import BaseSelect from "~/components/generic/form/BaseSelect";
import FormModal from "~/components/FormModal";

import { updateTeamMember } from "~/store/actions/teamActions";
import { fullName, role } from "~/utils/validation";

function MemberEditModal({ teamId, setOpen, initialValues, ...props }) {
  const dispatch = useDispatch();

  /**
   * TODO:
   * 1. setError or disable submit button if role value is not changed
   */
  const handleSubmit = (values) => {
    const { role, ...researcher } = values;
    const isAdmin = role === "administrator";

    dispatch(
      updateTeamMember({
        teamId,
        researcher: { ...researcher, isAdmin },
        role,
      }),
    );
    setOpen(false);
  };

  return (
    <FormModal
      title="Edit Member"
      setOpen={setOpen}
      validation={{ fullName, role }}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      {...props}
    >
      <BaseInput label="Full Name" name="fullName" type="text" disabled />
      <BaseSelect label="Role" name="role">
        <option value="" disabled defaultValue>
          Select role
        </option>
        <option value="administrator" disabled={initialValues?.isAdmin}>
          Administrator
        </option>
        <option value="researcher" disabled={!initialValues?.isAdmin}>
          Researcher
        </option>
      </BaseSelect>
    </FormModal>
  );
}

export default MemberEditModal;
