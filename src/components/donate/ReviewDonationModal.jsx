import { XCircle, Pencil } from "lucide-react";

function SummaryRow({ label, value }) {
  return (
    <div className="grid grid-cols-1 border-b border-slate-300 py-3 sm:grid-cols-[240px_1fr] sm:gap-6">
      <div className="text-[16px] font-bold text-[#243f57] sm:text-[18px]">
        {label}
      </div>
      <div className="mt-1 text-[16px] text-black sm:mt-0 sm:text-[18px] break-words">
        {value || "—"}
      </div>
    </div>
  );
}

export default function ReviewDonationModal({
  open,
  onClose,
  summary,
  onEditDonation,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/30 px-3 py-4 sm:px-6">
      <div className="relative w-full max-w-[1080px] overflow-hidden rounded-md border border-slate-400 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between border-b border-slate-300 bg-[#f3f3f3] px-4 py-4 sm:px-6">
          <div className="text-[18px] font-medium text-[#243f57] sm:text-[22px]">
            Donation details
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#243f57] transition hover:opacity-70"
          >
            <XCircle className="h-7 w-7" />
          </button>
        </div>

        <div className="mx-auto max-h-[75vh] overflow-y-auto p-4 sm:p-6 lg:max-w-[900px]">
          <div className="bg-[#243f57] px-4 py-4 text-[28px] font-bold text-white sm:px-6 sm:text-[44px]">
            View My Donation
          </div>

          <div className="border border-t-0 border-slate-400 px-4 py-6 sm:px-8 sm:py-8">
            <h3 className="text-[28px] font-light text-[#243f57] sm:text-[40px]">
              Donation
            </h3>

            <div className="mt-4">
              <SummaryRow label="Support" value={summary?.donation?.support} />
              <SummaryRow label="Organization" value={summary?.donation?.organization} />
              <SummaryRow label="Type" value={summary?.donation?.type} />
              <SummaryRow label="Amount" value={summary?.donation?.amount} />
              <SummaryRow label="Currency" value={summary?.donation?.currency} />
              <SummaryRow label="Payment method" value={summary?.donation?.paymentMethod} />
              <SummaryRow label="Frequency" value={summary?.donation?.frequency} />
              <SummaryRow label="Cover fees" value={summary?.donation?.coverFees} />
            </div>

            <h3 className="mt-10 text-[28px] font-light text-[#243f57] sm:text-[40px]">
              Personal information
            </h3>

            <div className="mt-4">
              <SummaryRow label="First name" value={summary?.personal?.firstName} />
              <SummaryRow label="Last name" value={summary?.personal?.lastName} />
              <SummaryRow label="Email" value={summary?.personal?.email} />
              <SummaryRow label="Phone" value={summary?.personal?.phone} />
            </div>

            <h3 className="mt-10 text-[28px] font-light text-[#243f57] sm:text-[40px]">
              Billing address
            </h3>

            <div className="mt-4">
              <SummaryRow label="Address line 1" value={summary?.billing?.addressLine1} />
              <SummaryRow label="Address line 2" value={summary?.billing?.addressLine2} />
              <SummaryRow label="City" value={summary?.billing?.city} />
              <SummaryRow label="Province" value={summary?.billing?.province} />
              <SummaryRow label="Postal code" value={summary?.billing?.postalCode} />
              <SummaryRow label="Country" value={summary?.billing?.country} />
            </div>

            {summary?.mtnUganda ? (
              <>
                <h3 className="mt-10 text-[28px] font-light text-[#243f57] sm:text-[40px]">
                  MTN Uganda
                </h3>
                <div className="mt-4">
                  <SummaryRow label="Phone number" value={summary?.mtnUganda?.phoneNumber} />
                  <SummaryRow
                    label="Registered name"
                    value={summary?.mtnUganda?.registeredName}
                  />
                </div>
              </>
            ) : null}

            {summary?.bankTransfer ? (
              <>
                <h3 className="mt-10 text-[28px] font-light text-[#243f57] sm:text-[40px]">
                  Bank transfer
                </h3>
                <div className="mt-4">
                  <SummaryRow label="Bank name" value={summary?.bankTransfer?.bankName} />
                  <SummaryRow label="Account name" value={summary?.bankTransfer?.accountName} />
                  <SummaryRow
                    label="Account number"
                    value={summary?.bankTransfer?.accountNumber}
                  />
                  <SummaryRow label="SWIFT / BIC" value={summary?.bankTransfer?.swiftCode} />
                  <SummaryRow label="Branch" value={summary?.bankTransfer?.branch} />
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 pb-6 sm:flex-row sm:justify-center sm:px-6">
          <button
            type="button"
            onClick={onEditDonation}
            className="inline-flex h-[56px] min-w-[280px] items-center justify-center gap-2 border border-[#d10058] bg-white px-8 text-[18px] font-bold uppercase tracking-[0.02em] text-[#d10058] transition hover:bg-[#fff1f7]"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}