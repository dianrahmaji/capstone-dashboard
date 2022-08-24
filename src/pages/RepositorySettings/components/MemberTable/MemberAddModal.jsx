import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import debounce from "lodash.debounce";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

import { userApi } from "~/api";
import { researcher, role } from "~/utils/validation";

import BaseButton from "~/components/generic/button/BaseButton";
import BaseModal from "~/components/generic/modal/BaseModal";
import { addTeamMember } from "~/store/actions/teamActions";
import BaseSelect from "~/components/generic/form/BaseSelect";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ResearcherCombobox({
  label,
  filteredItem,
  setQuery,
  members,
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  const { onBlur, value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleBlur = () => {
    onBlur({ target: { name: props.name } });
  };

  return (
    <div>
      <Combobox
        as="div"
        value={value}
        onBlur={handleBlur}
        onChange={(val) => setValue(val._id)}
      >
        <Combobox.Label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-accent bg-white py-2 pl-3 pr-10 font-bold text-primary shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(value) =>
              filteredItem.find(({ _id }) => value === _id)?.fullName
            }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          </Combobox.Button>

          {filteredItem.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItem.map((item) => (
                <Combobox.Option
                  key={item._id}
                  value={item}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-primary text-secondary" : "text-primary",
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex">
                        <span
                          className={classNames(
                            "truncate",
                            selected && "font-semibold",
                          )}
                        >
                          {item.fullName}
                        </span>
                        <span
                          className={classNames(
                            "ml-2 truncate text-gray-500",
                            active ? "text-indigo-200" : "text-gray-500",
                          )}
                        >
                          {item.email}
                        </span>
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-primary",
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {touched && error ? (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      ) : null}
    </div>
  );
}

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
            filteredItem={researchers}
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
