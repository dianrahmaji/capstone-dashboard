import { useDispatch } from "react-redux";

import BaseInput from "~/components/generic/form/BaseInput";
import FormModal from "~/components/FormModal";
import BaseMultipleInput from "~/components/generic/form/BaseMultipleInput";

import {
  fullName,
  email,
  faculty,
  userId,
  major,
  specialities,
} from "~/utils/validation";
import { updateUser } from "~/store/actions/userActions";

export default function ProfileEditModal(props) {
  const { setOpen } = props;
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUser(values));
    setOpen(false);
  };
  return (
    <FormModal
      title="Edit Profil"
      validation={{ fullName, email, userId, faculty, major, specialities }}
      handleSubmit={handleSubmit}
      {...props}
    >
      <BaseInput label="Nama" name="fullName" type="text" />
      <BaseInput label="Email" name="email" type="email" />
      <BaseInput label="Fakultas" name="faculty" type="text" />
      <BaseInput label="Program Studi" name="major" type="text" />
      <BaseInput label="NIM" name="userId" type="text" />
      <BaseMultipleInput label="Keahlian" name="specialities" />
    </FormModal>
  );
}
