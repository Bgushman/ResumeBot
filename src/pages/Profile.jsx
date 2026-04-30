import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:8000";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile`);
        if (!res.ok) throw new Error("Failed to load profile.");
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setMajor(data.major || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, major }),
      });
      if (!res.ok) throw new Error("Failed to save.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans flex flex-col">
      <Navbar />
      <main className="px-10 pt-10 pb-20 flex-1 max-w-[680px]">
        <h1 className="text-[28px] font-bold text-gray-900 mb-1">Profile</h1>
        <p className="text-[14px] text-gray-500 mb-8">Manage your account details and preferences.</p>

        {loading ? (
          <p className="text-gray-400 text-[14px]">Loading your profile...</p>
        ) : (
          <>
            {name && (
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-[#7a0d0d] flex items-center justify-center text-white text-[20px] font-bold">
                  {initials}
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-800">{name}</p>
                  <p className="text-[13px] text-gray-400">{email}</p>
                </div>
              </div>
            )}

            <div className="bg-white border border-black/10 rounded-xl p-6 flex flex-col gap-5">
              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#f5f4f2] border border-black/10 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#7a0d0d] transition-colors" />
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#f5f4f2] border border-black/10 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#7a0d0d] transition-colors" />
              </div>
              <div>
                <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Default Major</label>
                <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} className="w-full bg-[#f5f4f2] border border-black/10 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#7a0d0d] transition-colors" />
              </div>
              {error && <p className="text-[13px] text-red-600">{error}</p>}
              <div className="flex items-center gap-4 pt-2">
                <button onClick={handleSave} disabled={saving} className="bg-[#7a0d0d] hover:bg-[#5e0909] disabled:opacity-60 text-white text-[14px] font-semibold px-6 py-3 rounded-lg transition-colors">
                  {saved ? "Saved ✓" : saving ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={() => navigate("/")} className="text-[14px] text-gray-400 hover:text-gray-600">Cancel</button>
              </div>
            </div>

            <div className="mt-6 bg-white border border-red-100 rounded-xl p-6">
              <p className="text-[13px] font-bold text-gray-700 mb-1">Delete Account</p>
              <p className="text-[12px] text-gray-400 mb-4">Permanently delete your account and all analysis history.</p>
              <button className="text-[13px] text-[#7a0d0d] border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">Delete Account</button>
            </div>
          </>
        )}
      </main>
      <footer className="border-t border-black/10 px-8 py-6">
        <p className="text-[#7a0d0d] text-[14px] font-bold mb-1">ResumeBot</p>
        <p className="text-gray-400 text-[13px]">© 2026 ResumeBot. Built for the Scholarly Architect.</p>
      </footer>
    </div>
  );
}