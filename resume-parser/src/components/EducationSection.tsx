import { Education } from "@/lib/types";

interface Props {
  education: Education[];
}

export default function EducationSection({ education }: Props) {
  return (
    <div className="space-y-4 mt-2">
      {education.map((edu, i) => (
        <div key={i}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-heading">{edu.institution}</p>
              <p className="text-sm text-muted">
                {edu.degree} in {edu.field}
                {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
              </p>
            </div>
            <span className="text-xs text-muted whitespace-nowrap shrink-0">
              {edu.startDate} – {edu.endDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
