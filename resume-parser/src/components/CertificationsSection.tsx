import { Certification } from "@/lib/types";

interface Props {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: Props) {
  return (
    <div className="space-y-2 mt-2">
      {certifications.map((cert, i) => (
        <div key={i} className="flex items-center justify-between">
          <p className="text-sm text-heading">{cert.name}</p>
          <span className="text-xs text-muted">{cert.year}</span>
        </div>
      ))}
    </div>
  );
}
