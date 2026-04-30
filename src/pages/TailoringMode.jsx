import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:8000";

export default function TailoringMode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, major } = location.state || {};
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!jobDescription.trim()) return setError("Please paste a job description.");
    if (!sessionId) return setError("Session expired. Please go back and upload your resume again.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: jobDescription }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Analysis failed.");
      }
      const data = await res.json();
      navigate("/results", { state: { results: data, sessionId, major } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans flex flex-col">
      <Navbar />
      <main className="flex flex-col items-center px-6 pt-14 pb-20 flex-1">
        <h1 className="text-[#7a0d0d] text-5xl font-bold text-center mb-4">Tailoring Mode</h1>
        <p className="text-gray-700 text-[15px] text-center max-w-[480px] leading-relaxed mb-10">
          Paste your target job description below. Our AI will analyze the requirements and help you align your resume for a perfect match.
        </p>
        <div className="bg-white border border-black/10 rounded-xl p-8 w-full max-w-[620px] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#7a0d0d] text-xl">💼</span>
            <h2 className="text-[#7a0d0d] text-[18px] font-bold">Target Job Description</h2>
          </div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2">Job Details</p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job title and description here... e.g. Senior Product Designer... We are looking for someone with expertise in Figma and stakeholder management..."
            className="w-full h-[280px] bg-[#f5f4f2] border border-black/10 rounded-lg p-4 text-[14px] text-gray-700 placeholder-gray-400 resize-none outline-none focus:border-[#7a0d0d] transition-colors"
          />
          <p className="text-[12px] text-gray-400 mt-2 mb-6">ℹ Include technical skills, responsibilities, and qualifications for the most accurate alignment.</p>
          {error && <p className="text-[13px] text-red-600 mb-4">{error}</p>}
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-[#7a0d0d] hover:bg-[#5e0909] disabled:opacity-60 text-white text-[15px] font-semibold py-4 rounded-lg transition-colors">
            {loading ? "Analyzing..." : "Run Alignment Analysis"}
          </button>
        </div>
      </main>
      <footer className="border-t border-black/10 px-8 py-6">
        <p className="text-[#7a0d0d] text-[14px] font-bold mb-1">ResumeBot</p>
        <p className="text-gray-400 text-[13px]">© 2026 ResumeBot. Built for the Scholarly Architect.</p>
      </footer>
    </div>
  );
}