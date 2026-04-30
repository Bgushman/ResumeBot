import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MAJORS = [
  "Accounting", "Biology", "Business Administration",
  "Chemical Engineering", "Civil Engineering", "Computer Engineering",
  "Computer Science", "Data Science", "Economics",
  "Electrical Engineering", "Finance", "Information Technology",
  "Marketing", "Mechanical Engineering", "Nursing", "Psychology",
];

const API_BASE = "http://localhost:8000";

export default function Home() {
  const navigate = useNavigate();
  const [major, setMajor] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const handleFileInput = (e) => {
    const selected = e.target.files[0];
    if (selected) { setFile(selected); setError(""); }
  };

  const handleSubmit = async () => {
    if (!major) return setError("Please select your major.");
    if (!file) return setError("Please upload your resume.");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("major", major);
      const res = await fetch(`${API_BASE}/api/upload`, { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Upload failed.");
      }
      const data = await res.json();
      navigate("/tailor", { state: { sessionId: data.session_id, major } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans">
      <Navbar />
      <main className="flex flex-col items-center px-6 pt-16 pb-20">
        <h1 className="text-[#7a0d0d] text-5xl font-bold text-center max-w-[720px] leading-tight mb-5" style={{ fontFamily: "Georgia, serif" }}>
          Get AI-Powered Resume Feedback
        </h1>
        <p className="text-gray-700 text-[15px] text-center max-w-[500px] leading-relaxed mb-10">
          Unlock precision insights tailored to your field. Upload your resume for major-specific feedback engineered by the Scholarly Architect.
        </p>
        <div className="bg-[#efefed] border border-black/10 rounded-xl p-8 w-full max-w-[620px]">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-600 mb-2">1. Select your major</p>
          <div className="bg-white border border-black/10 rounded-md flex items-center px-4 h-[46px] mb-7">
            <select value={major} onChange={(e) => setMajor(e.target.value)} className="flex-1 bg-transparent text-[14px] text-gray-500 outline-none appearance-none cursor-pointer">
              <option value="" disabled>Choose your academic discipline...</option>
              {MAJORS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <span className="text-gray-400 text-lg">⌄</span>
          </div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-600 mb-2">2. Upload your resume (PDF)</p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            className={`border-2 border-dashed rounded-lg bg-[#f5f4f2] flex flex-col items-center justify-center py-12 px-6 mb-2 cursor-pointer transition-colors ${dragging ? "border-[#7a0d0d]" : "border-gray-300 hover:border-[#7a0d0d]"}`}
          >
            <div className="w-14 h-14 bg-[#e8d0d0] rounded-xl flex items-center justify-center mb-3">
              <svg width="26" height="32" viewBox="0 0 26 32" fill="none">
                <path d="M4 0C1.8 0 0 1.8 0 4v24c0 2.2 1.8 4 4 4h18c2.2 0 4-1.8 4-4V10L16 0H4z" fill="#e8d0d0"/>
                <path d="M16 0v8c0 1.1.9 2 2 2h8L16 0z" fill="#c9a0a0"/>
                <path d="M13 14v8M13 14l-3 3M13 14l3 3" stroke="#7a0d0d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {file ? (
              <p className="text-[15px] font-semibold text-[#7a0d0d]">{file.name}</p>
            ) : (
              <>
                <p className="text-[15px] font-semibold text-gray-800 mb-1">Drag and drop your PDF here</p>
                <p className="text-[14px] text-gray-500">or <span className="text-[#7a0d0d] underline">click to browse</span> your library</p>
              </>
            )}
            <p className="text-[11px] tracking-widest uppercase text-gray-400 mt-3">Maximum file size: 10MB</p>
          </div>
          <input type="file" id="fileInput" accept=".pdf" className="hidden" onChange={handleFileInput} />
          {error && <p className="text-[13px] text-red-600 mt-2 mb-2">{error}</p>}
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-[#7a0d0d] hover:bg-[#5e0909] disabled:opacity-60 text-white text-[15px] font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-5">
            {loading ? "Uploading..." : "Get Resume Review ✦"}
          </button>
        </div>
      </main>
    </div>
  );
}