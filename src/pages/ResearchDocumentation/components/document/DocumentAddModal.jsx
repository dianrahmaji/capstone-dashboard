import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
  contributions,
  description,
  files,
  references,
  status,
  version,
} from "~/utils/validation";
import { addDocument } from "~/store/actions/documentActions";
import useSelectedTeam from "~/hooks/useSelectedTeam";

import AuthorInput from "./AuthorInput";
import BaseModal from "~/components/generic/modal/BaseModal";
import BaseFileUpload from "~/components/generic/form/BaseFileUpload";
import BaseSelect from "~/components/generic/form/BaseSelect";
import BaseTextArea from "~/components/generic/form/BaseTextArea";
import BaseButton from "~/components/generic/button/BaseButton";
import ReferenceInput from "./ReferenceInput";
import BaseInput from "~/components/generic/form/BaseInput";

export default function DocumentAddModal({ open, setOpen, title }) {
  const dispatch = useDispatch();

  const folderId = useSelector((state) => state.activeFolderId);

  const {
    repository: { _id: repositoryId },
  } = useSelectedTeam();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { files, contributions, references, ...rest } = values;

    const payload = {
      folderId,
      contributions: contributions.map(({ author, contribution }) => ({
        author: author._id,
        contribution,
      })),
      references: references.map((r) => r._id),
      ...files[0],
      repositoryId,
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
          contributions: [],
          references: [],
          status: "",
          files: [],
          version: "",
        }}
        validationSchema={Yup.object({
          contributions,
          references,
          description,
          files,
          status,
          version,
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <BaseFileUpload
            label="Dokumen"
            name="files"
            id="files"
            location={repositoryId}
          />
          <BaseSelect label="Status" name="status">
            <option value="" disabled defaultValue>
              Pilih status
            </option>
            <option value="ongoing">Ongoing</option>
            <option value="draft">Draft</option>
            <option value="done">Done</option>
          </BaseSelect>
          <BaseInput label="Versi" name="version" />
          <BaseTextArea label="Deskripsi" name="description" />
          <AuthorInput label="Kontribusi" name="contributions" />
          <ReferenceInput label="Referensi" name="references" />
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
