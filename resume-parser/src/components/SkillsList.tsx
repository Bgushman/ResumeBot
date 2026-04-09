interface Props {
  skills: string[];
}

export default function SkillsList({ skills }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
