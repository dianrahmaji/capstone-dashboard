import { useDispatch } from "react-redux";
import { UploadIcon } from "@heroicons/react/solid";

import BaseInput from "~/components/generic/form/BaseInput";
import BaseMultipleInput from "~/components/generic/form/BaseMultipleInput";
import TextEditorInput from "~/components/TextEditorInput";
import FormModal from "~/components/FormModal";

import { name, title, topics, description, date } from "~/utils/validation";
import { updateAcceptedTeam } from "~/store/actions/teamActions";
// import BaseFileUpload from "~/components/generic/form/BaseFileUpload";

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
      <div className="mt-3 block text-sm font-medium text-gray-700">
        Referensi
      </div>
      <div className="flex w-full appearance-none items-center justify-between rounded-md border p-2 text-gray-800 shadow-sm disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm">
        <span className="text-gray-800">Dokumen C-251.pdf</span>
        <div>
          <button
            type="button"
            className="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-800 focus:bg-gray-800 focus:text-white focus:outline-none"
            onClick={() => {}}
          >
            <span className="sr-only">Remove </span>
            <svg
              className="h-2.5 w-2.5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M1 1l6 6m0-6L1 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex w-full appearance-none items-center justify-between rounded-md border p-2 text-gray-800 shadow-sm disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm">
        <span className="text-gray-800">Dokumen C-501.pdf</span>
        <div>
          <button
            type="button"
            className="ml-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-300 hover:text-gray-800 focus:bg-gray-800 focus:text-white focus:outline-none"
            onClick={() => {}}
          >
            <span className="sr-only">Remove </span>
            <svg
              className="h-2.5 w-2.5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M1 1l6 6m0-6L1 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-2 flex w-32 items-center gap-2 rounded-md bg-primary p-2 pl-3 text-white hover:bg-accent hover:text-secondary">
        <div>Choose File</div> <UploadIcon className="inline h-4 w-4" />
      </div>
      {/* <BaseFileUpload label="Referensi" name="references" /> */}
    </FormModal>
  );
}

export default ProposalModal;
