import BaseButton from "~/components/generic/button/BaseButton";
import BaseModal from "~/components/generic/modal/BaseModal";

function ResearchRespondModal({ open, setOpen, selectedProposal }) {
  return (
    <BaseModal title="Review" open={open} setOpen={setOpen}>
      <p className="my-3 mx-2 text-sm text-gray-900 sm:col-span-2">
        {selectedProposal?.review}
      </p>
      <BaseButton
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md border shadow-sm sm:mt-0 sm:text-sm"
        secondary
        onClick={() => setOpen(false)}
      >
        Tutup
      </BaseButton>
    </BaseModal>
  );
}

export default ResearchRespondModal;
