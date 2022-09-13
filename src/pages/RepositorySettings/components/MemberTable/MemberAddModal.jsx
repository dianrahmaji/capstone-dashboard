import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import debounce from "lodash.debounce";

import { userApi } from "~/api";
import { researcher, role } from "~/utils/validation";

import BaseButton from "~/components/generic/button/BaseButton";
import BaseModal from "~/components/generic/modal/BaseModal";
import { addTeamMember } from "~/store/actions/teamActions";
import BaseSelect from "~/components/generic/form/BaseSelect";
import ResearcherCombobox from "./ResearcherCombobox";

function MemberAddModal({ open, setOpen, members, teamId }) {
  const [researchers, setResearchers] = useState([]);
  const [selectedReseracher, setSelectedResearcher] = useState(null);

  const dispatch = useDispatch();

  const fetchResearchers = async (query) => {
    const { data } = await userApi.searchResearchers(query);
    setResearchers(data);
  };

  useEffect(() => {
    fetchResearchers("");
  }, []);

  const handleQuery = debounce((query) => {
    fetchResearchers(query);
  }, 500);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    if (members.includes(values.researcher)) {
      setFieldError("researcher", "Researcher already exists");
      return;
    }

    dispatch(
      addTeamMember({
        teamId,
        researcher: researchers.find(({ _id }) => _id === values.researcher),
        role: values.role,
      }),
    );

    setSubmitting(false);
    setOpen(false);
  };

  return (
    <BaseModal title="Add Member" open={open} setOpen={setOpen}>
      <Formik
        initialValues={{ researcher: "", role: "" }}
        validationSchema={Yup.object({ researcher, role })}
        onSubmit={handleSubmit}
      >
        <Form>
          <ResearcherCombobox
            label="Search by Fullname or Email"
            id="researcher"
            name="researcher"
            value={selectedReseracher}
            onChange={setSelectedResearcher}
            filteredItems={researchers}
            setQuery={handleQuery}
            members={members}
          />
          <BaseSelect label="Role" name="role">
            <option value="" disabled defaultValue>
              Select role
            </option>
            <option value="administrator">Administrator</option>
            <option value="researcher">Researcher</option>
          </BaseSelect>
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

export default MemberAddModal;
