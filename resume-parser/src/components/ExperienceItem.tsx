import { ExperienceItem as ExperienceItemType } from "@/lib/types";

interface Props {
  item: ExperienceItemType;
}

export default function ExperienceItem({ item }: Props) {
  return (
    <div className="mt-4 first:mt-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-heading">{item.title}</p>
          <p className="text-xs text-muted">{item.company}</p>
        </div>
        <span className="text-xs text-muted whitespace-nowrap shrink-0">
          {item.startDate} – {item.endDate}
        </span>
      </div>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        {item.bullets.map((b, i) => (
          <li key={i} className="text-sm text-gray-700 leading-relaxed">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
