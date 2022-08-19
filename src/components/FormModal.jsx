import BaseButton from "./generic/button/BaseButton";
import BaseForm from "./generic/form/BaseForm";
import BaseModal from "./generic/modal/BaseModal";

function FormModal({ title, open, setOpen, children, ...props }) {
  return (
    <BaseModal title={title} open={open} setOpen={setOpen}>
      <BaseForm {...props}>
        {children}
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
      </BaseForm>
    </BaseModal>
  );
}

export default FormModal;
