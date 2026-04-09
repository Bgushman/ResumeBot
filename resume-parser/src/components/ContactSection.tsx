import { ContactInfo } from "@/lib/types";

interface Props {
  contact: ContactInfo;
}

export default function ContactSection({ contact }: Props) {
  const rows = [
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "Location", value: contact.location },
    ...(contact.linkedin ? [{ label: "LinkedIn", value: contact.linkedin }] : []),
  ];

  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-2">
      {rows.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-xs text-muted font-medium uppercase tracking-wide">{label}</dt>
          <dd className="text-sm text-heading mt-0.5">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
