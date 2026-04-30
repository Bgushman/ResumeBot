import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ATSResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};

  if (!results) {
    return (
      <div className="min-h-screen bg-[#f5f4f2] flex flex-col font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-gray-400 text-[15px] mb-4">No results found.</p>
          <button onClick={() => navigate("/")} className="bg-[#7a0d0d] text-white px-6 py-3 rounded-lg text-[14px] font-semibold">Go Back Home</button>
        </div>
      </div>
    );
  }

  const { ats_score, match_label, job_title, keyword_relevance, experience_alignment, education_fit, keywords_matched, keywords_total, required_tech = [], cloud_infrastructure = [], missing_keywords = [] } = results;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (ats_score / 100) * circumference;

  const metrics = [
    { label: "Keyword Relevance", value: keyword_relevance },
    { label: "Experience Alignment", value: experience_alignment },
    { label: "Education Fit", value: education_fit },
  ];

  const Tag = ({ label, matched }) => (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[13px] border ${matched ? "border-gray-300 text-gray-700 bg-white" : "border-red-200 text-[#7a0d0d] bg-red-50"}`}>
      {label}
      <span className={`text-[12px] ${matched ? "text-green-500" : "text-[#7a0d0d]"}`}>{matched ? "✓" : "✕"}</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans flex flex-col">
      <Navbar />
      <div className="px-10 pt-8 pb-6">
        <p className="text-[11px] font-bold tracking-widest uppercase text-[#7a0d0d] mb-1">ATS Match Analysis</p>
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">Resume & Job Alignment Profile</h1>
        <p className="text-[14px] text-gray-500 max-w-[420px] leading-relaxed">
          Comparison between your resume and the {job_title} role. Identifying critical keyword matches and experience gaps.
        </p>
      </div>
      <div className="px-10 pb-16 flex gap-6 items-start">
        <div className="bg-white border border-black/10 rounded-xl p-6 w-[220px] flex-shrink-0">
          <div className="flex justify-center mb-4">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="#f0e0e0" strokeWidth="10" />
              <circle cx="80" cy="80" r={radius} fill="none" stroke="#7a0d0d" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 80 80)" />
              <text x="80" y="72" textAnchor="middle" fill="#7a0d0d" fontSize="36" fontWeight="700">{ats_score}</text>
              <text x="104" y="72" textAnchor="start" fill="#7a0d0d" fontSize="14" fontWeight="600">%</text>
              <text x="80" y="90" textAnchor="middle" fill="#7a0d0d" fontSize="11" fontWeight="600" letterSpacing="2">ATS MATCH</text>
            </svg>
          </div>
          <p className="text-center text-[15px] font-bold text-gray-800 mb-1">{match_label}</p>
          <p className="text-center text-[12px] text-gray-400 mb-6">{job_title}</p>
          <div className="flex flex-col gap-4">
            {metrics.map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[12px] text-gray-500">{label}</span>
                  <span className="text-[12px] font-semibold text-gray-700">{value}%</span>
                </div>
                <div className="h-[5px] bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7a0d0d] rounded-full" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-black/10 rounded-xl p-6 flex-1">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[18px] font-bold text-gray-900">Keyword Comparison Matrix</h2>
            <span className="bg-gray-100 text-gray-600 text-[12px] font-semibold px-3 py-1 rounded-md whitespace-nowrap">
              {keywords_matched}/{keywords_total} <span className="font-normal tracking-wide">KEYWORDS MATCHED</span>
            </span>
          </div>
          <p className="text-[13px] text-gray-400 mb-6">How your skills match against the job description requirements.</p>
          {required_tech.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3"><span className="text-[#7a0d0d]">▌</span> Required Tech Stack</p>
              <div className="flex flex-wrap gap-2">{required_tech.map((t) => <Tag key={t.label} label={t.label} matched={t.matched} />)}</div>
            </div>
          )}
          {cloud_infrastructure.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3"><span className="text-[#7a0d0d]">▌</span> Cloud & Infrastructure</p>
              <div className="flex flex-wrap gap-2">{cloud_infrastructure.map((t) => <Tag key={t.label} label={t.label} matched={t.matched} />)}</div>
            </div>
          )}
          {missing_keywords.length > 0 && (
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-3"><span className="text-[#7a0d0d]">▌</span> Missing from Resume</p>
              <div className="flex flex-wrap gap-2">{missing_keywords.map((t) => <Tag key={t.label} label={t.label} matched={false} />)}</div>
            </div>
          )}
          <button onClick={() => navigate("/")} className="mt-8 text-[13px] text-[#7a0d0d] underline cursor-pointer">← Analyze another resume</button>
        </div>
      </div>
      <footer className="border-t border-black/10 px-8 py-6 mt-auto">
        <p className="text-[#7a0d0d] text-[14px] font-bold mb-1">ResumeBot</p>
        <p className="text-gray-400 text-[13px]">© 2026 ResumeBot. Built for the Scholarly Architect.</p>
      </footer>
    </div>
  );
}