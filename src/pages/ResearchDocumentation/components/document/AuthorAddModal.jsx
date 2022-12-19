import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { author, contribution } from "~/utils/validation";
import useSelectedTeam from "~/hooks/useSelectedTeam";

import AuthorCombobox from "./AuthorCombobox";
import BaseButton from "~/components/generic/button/BaseButton";
import BaseModal from "~/components/generic/modal/BaseModal";
import BaseInput from "~/components/generic/form/BaseInput";

export default function AuthorAddModal({
  open,
  setOpen,
  authors,
  onAddAuthor,
}) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const { members } = useSelectedTeam();

  const handleQuery = (query) => {
    const _filteredMembers = members.filter(
      ({ fullName, email }) =>
        fullName.includes(query) || email.includes(query),
    );

    setFilteredMembers(_filteredMembers);
  };

  const handleSubmit = (
    { author, contribution },
    { setSubmitting, setFieldError },
  ) => {
    if (authors.includes(author)) {
      setFieldError("author", "Author is already added!");
      return;
    }

    onAddAuthor({ author, contribution });

    setSubmitting(false);
    setOpen(false);
  };

  return (
    <BaseModal title="Tambah Author" open={open} setOpen={setOpen}>
      <Formik
        initialValues={{ author: {}, contribution: 0 }}
        validationSchema={Yup.object({ author, contribution })}
        onSubmit={handleSubmit}
      >
        <Form>
          <AuthorCombobox
            label="Peneliti"
            id="author"
            name="author"
            value={selectedMember}
            onChange={setSelectedMember}
            setQuery={handleQuery}
            filteredItems={filteredMembers}
          />
          <BaseInput
            label="Kontribusi (Jam)"
            name="contribution"
            type="number"
          />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <BaseButton
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 shadow-sm focus:outline-none sm:col-start-2 sm:text-sm"
            >
              Simpan
            </BaseButton>
            <BaseButton
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border px-4 py-2 shadow-sm sm:col-start-1 sm:mt-0 sm:text-sm"
              secondary
              onClick={() => setOpen(false)}
            >
              Batal
            </BaseButton>
          </div>
        </Form>
      </Formik>
    </BaseModal>
  );
}
