const MAJORS = [
  'Computer Science',
  'Business',
  'Biology',
  'Engineering',
  'Psychology',
  'Economics',
  'Data Science',
  'Nursing',
  'Communications',
  'Political Science',
]

function MajorSelector({ value, onChange }) {
  return (
    <div className="major-selector">
      <label htmlFor="major-select">Select Your Major</label>
      <select
        id="major-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Choose a major --</option>
        {MAJORS.map((major) => (
          <option key={major} value={major}>
            {major}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MajorSelector
