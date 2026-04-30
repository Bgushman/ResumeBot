import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:8000";

function ScoreBadge({ score }) {
  const color = score >= 85 ? "bg-green-50 text-green-700 border-green-200" : score >= 70 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-[#7a0d0d] border-red-200";
  return <span className={`text-[12px] font-bold px-3 py-1 rounded-full border ${color}`}>{score}/100</span>;
}

export default function History() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/sessions`);
        if (!res.ok) throw new Error("Failed to load history.");
        const data = await res.json();
        setSessions(data.sessions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans flex flex-col">
      <Navbar />
      <main className="px-10 pt-10 pb-20 flex-1">
        <h1 className="text-[28px] font-bold text-gray-900 mb-1">Analysis History</h1>
        <p className="text-[14px] text-gray-500 mb-8">Your past resume analyses and ATS scores.</p>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-[14px]">Loading your history...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 mb-6">
            <p className="text-[13px] text-[#7a0d0d]">{error}</p>
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="bg-white border border-black/10 rounded-xl p-16 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-[#f0e0e0] rounded-xl flex items-center justify-center mb-4">
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M2 0C0.9 0 0 0.9 0 2v22c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8L14 0H2z" fill="#e8d0d0"/>
                <path d="M14 0v6c0 1.1.9 2 2 2h6L14 0z" fill="#c9a0a0"/>
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-gray-700 mb-1">No analyses yet</p>
            <p className="text-[13px] text-gray-400 mb-6 text-center max-w-[260px]">Upload your first resume to get started with AI-powered feedback.</p>
            <button onClick={() => navigate("/")} className="bg-[#7a0d0d] hover:bg-[#5e0909] text-white text-[13px] font-semibold px-6 py-3 rounded-lg transition-colors">
              Analyze your first resume
            </button>
          </div>
        )}

        {!loading && sessions.length > 0 && (
          <div className="flex flex-col gap-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => navigate("/report", { state: { results: session } })}
                className="bg-white border border-black/10 rounded-xl px-6 py-5 flex items-center justify-between hover:border-[#7a0d0d] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f0e0e0] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                      <path d="M2 0C0.9 0 0 0.9 0 2v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7L11 0H2z" fill="#e8d0d0"/>
                      <path d="M11 0v5c0 1.1.9 2 2 2h5L11 0z" fill="#c9a0a0"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-800">{session.resume_name || "Resume Analysis"}</p>
                    <p className="text-[12px] text-gray-400">{session.job_title || "Job Analysis"} · {session.created_at ? new Date(session.created_at).toLocaleDateString() : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {session.ats_score && <ScoreBadge score={session.ats_score} />}
                  <span className="text-gray-300 text-lg">›</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => navigate("/")} className="mt-8 bg-[#7a0d0d] hover:bg-[#5e0909] text-white text-[14px] font-semibold px-6 py-3 rounded-lg transition-colors">
          + New Analysis
        </button>
      </main>
      <footer className="border-t border-black/10 px-8 py-6">
        <p className="text-[#7a0d0d] text-[14px] font-bold mb-1">ResumeBot</p>
        <p className="text-gray-400 text-[13px]">© 2026 ResumeBot. Built for the Scholarly Architect.</p>
      </footer>
    </div>
  );
}