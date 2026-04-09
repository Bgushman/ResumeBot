import { Project } from "@/lib/types";

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <div className="space-y-4 mt-2">
      {projects.map((p, i) => (
        <div key={i}>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-heading">{p.name}</p>
            <span className="text-muted text-xs">·</span>
            <span className="text-xs text-muted">{p.tech.join(", ")}</span>
          </div>
          <ul className="mt-1.5 space-y-1 list-disc list-inside">
            {p.bullets.map((b, j) => (
              <li key={j} className="text-sm text-gray-700 leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
