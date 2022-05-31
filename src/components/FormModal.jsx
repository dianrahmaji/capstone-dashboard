import BaseButton from './generic/button/BaseButton'
import BaseForm from './generic/form/BaseForm'
import BaseModal from './generic/modal/BaseModal'

const FormModal = ({ title, open, setOpen, children, ...props }) => {
  return (
    <BaseModal title={title} open={open} setOpen={setOpen}>
      <BaseForm {...props}>
        {children}
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <BaseButton
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 focus:outline-none sm:col-start-2 sm:text-sm"
          >
            Simpan
          </BaseButton>
          <BaseButton
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 sm:mt-0 sm:col-start-1 sm:text-sm"
            secondary
            onClick={() => setOpen(false)}
          >
            Batal
          </BaseButton>
        </div>
      </BaseForm>
    </BaseModal>
  )
}

export default FormModal
