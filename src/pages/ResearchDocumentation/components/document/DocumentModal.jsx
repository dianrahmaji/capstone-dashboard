import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
  authors,
  craftingTime,
  description,
  files,
  status,
} from "~/utils/validation";

import AuthorInput from "./AuthorInput";
import BaseModal from "~/components/generic/modal/BaseModal";
import BaseInput from "~/components/generic/form/BaseInput";
import BaseFileUpload from "~/components/generic/form/BaseFileUpload";
import BaseSelect from "~/components/generic/form/BaseSelect";
import BaseTextArea from "~/components/generic/form/BaseTextArea";
import BaseButton from "~/components/generic/button/BaseButton";
import { addDocument } from "~/store/actions/documentActions";

function DocumentModal({ open, setOpen, title }) {
  const dispatch = useDispatch();

  const folderId = useSelector((state) => state.activeFolderId);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { files, authors, ...rest } = values;

    const payload = {
      folderId,
      authors: authors.map(({ _id }) => _id),
      ...files[0],
      ...rest,
    };

    dispatch(addDocument(payload));
    setSubmitting(false);
    setOpen(false);
  };
  return (
    <BaseModal title={title} open={open} setOpen={setOpen}>
      <Formik
        initialValues={{
          description: "",
          authors: [],
          status: "",
          files: [],
          craftingTime: 0,
        }}
        validationSchema={Yup.object({
          authors,
          craftingTime,
          description,
          files,
          status,
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <BaseFileUpload label="Documents" name="files" id="files" />
          <BaseSelect label="Status" name="status">
            <option value="" disabled defaultValue>
              Select current status
            </option>
            <option value="ongoing">Ongoing</option>
            <option value="draft">Draft</option>
            <option value="done">Done</option>
            <option value="critical">Critical</option>
          </BaseSelect>
          <BaseInput
            label="Crafting Time (Hours)"
            name="craftingTime"
            type="number"
          />
          <BaseTextArea label="Description" name="description" />
          <AuthorInput label="authors" name="authors" />
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

export default DocumentModal;
