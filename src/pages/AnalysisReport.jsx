import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AnalysisReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || {};

  if (!results) {
    return (
      <div className="min-h-screen bg-[#f5f4f2] flex flex-col font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-gray-400 text-[15px] mb-4">No report found.</p>
          <button onClick={() => navigate("/")} className="bg-[#7a0d0d] text-white px-6 py-3 rounded-lg text-[14px] font-semibold">Go Back Home</button>
        </div>
      </div>
    );
  }

  const { scan_label, ats_score, candidate = {}, experience = [], projects = [], education = [], strengths = [], improvements = [] } = results;
  const { name, title, email, location: candidateLocation } = candidate;

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans flex flex-col">
      <Navbar />
      <div className="px-10 pt-8 pb-4">
        <h1 className="text-[36px] font-black text-[#7a0d0d] mb-1" style={{ fontFamily: "Georgia, serif" }}>Analysis Report</h1>
        {scan_label && <p className="text-[14px] text-gray-500">Scanned: {scan_label}</p>}
      </div>
      <div className="px-10 pb-16 flex gap-6 items-start">
        <div className="bg-white border border-black/10 rounded-xl p-8 flex-1">
          {name && <h2 className="text-[28px] font-bold text-gray-900 mb-1">{name}</h2>}
          {title && <p className="text-[12px] font-bold tracking-widest uppercase text-[#7a0d0d] mb-2">{title}</p>}
          {(email || candidateLocation) && (
            <p className="text-[13px] text-gray-400 flex items-center gap-2 mb-6">
              {email && <span>{email}</span>}
              {email && candidateLocation && <span>•</span>}
              {candidateLocation && <span>{candidateLocation}</span>}
            </p>
          )}
          <div className="border-t border-black/10 mb-6" />
          {experience.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Experience</p>
              {experience.map((exp, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[15px] font-bold text-gray-900">{exp.company}</p>
                    <p className="text-[13px] text-gray-400">{exp.dates}</p>
                  </div>
                  <p className="text-[13px] italic text-gray-500 mb-2">{exp.role}</p>
                  {exp.bullets && <ul className="list-disc list-inside space-y-1">{exp.bullets.map((b, j) => <li key={j} className="text-[13px] text-gray-600">{b}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div className="mb-6">
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Projects</p>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <p className="text-[15px] font-bold text-gray-900">{proj.name}</p>
                  <p className="text-[13px] text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Education</p>
              {education.map((edu, i) => (
                <div key={i} className="flex justify-between items-baseline mb-3">
                  <div>
                    <p className="text-[15px] font-bold text-gray-900">{edu.school}</p>
                    <p className="text-[13px] text-gray-500">{edu.degree}</p>
                  </div>
                  <p className="text-[13px] text-gray-400">{edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-4">
          <div className="bg-[#7a0d0d] rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-red-200 mb-1">ATS Fit Score</p>
              <p className="text-white text-[42px] font-black leading-none">{ats_score}<span className="text-[20px] font-normal text-red-200">/100</span></p>
            </div>
            <div className="w-14 h-14 border-2 border-red-300 rounded-xl flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 20 L10 14 L14 18 L20 10 L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 8 L24 8 L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {strengths.length > 0 && (
            <div className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#7a0d0d]">✦</span>
                <h3 className="text-[16px] font-bold text-gray-900">Strengths</h3>
              </div>
              <div className="flex flex-col gap-3">
                {strengths.map((s, i) => (
                  <div key={i} className="bg-[#f5f4f2] rounded-lg p-3">
                    <p className="text-[13px] font-bold text-gray-800 mb-1">{s.title}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {improvements.length > 0 && (
            <div className="bg-white border border-black/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#7a0d0d]">ⓘ</span>
                <h3 className="text-[16px] font-bold text-gray-900">Areas for Improvement</h3>
              </div>
              <div className="flex flex-col gap-3">
                {improvements.map((item, i) => (
                  <div key={i} className="border-l-2 border-[#7a0d0d] pl-3 py-1">
                    <p className="text-[13px] font-bold text-gray-800 mb-1">{item.title}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => navigate("/")} className="text-[13px] text-[#7a0d0d] underline cursor-pointer text-left">← Analyze another resume</button>
        </div>
      </div>
      <footer className="border-t border-black/10 px-8 py-6 mt-auto">
        <p className="text-[#7a0d0d] text-[14px] font-bold mb-1">ResumeBot</p>
        <p className="text-gray-400 text-[13px]">© 2026 ResumeBot. Built for the Scholarly Architect.</p>
      </footer>
    </div>
  );
}