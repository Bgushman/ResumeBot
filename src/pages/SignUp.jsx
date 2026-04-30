import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8000";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) return setError("Please fill in all fields.");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Sign up failed.");
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2] font-sans flex flex-col">
      <nav className="bg-white border-b border-black/10 flex items-center px-8 h-[52px]">
        <span onClick={() => navigate("/")} className="text-[#7a0d0d] text-[13px] font-black tracking-widest uppercase cursor-pointer">ResumeBot</span>
      </nav>
      <main className="flex flex-col items-center justify-center flex-1 px-6 pb-20">
        <div className="bg-white border border-black/10 rounded-xl p-8 w-full max-w-[420px]">
          <h1 className="text-[#7a0d0d] text-[28px] font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>Create an account.</h1>
          <p className="text-[14px] text-gray-400 mb-8">Join ResumeBot and start optimizing your resume.</p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full bg-[#f5f4f2] border border-black/10 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#7a0d0d] transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full bg-[#f5f4f2] border border-black/10 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#7a0d0d] transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#f5f4f2] border border-black/10 rounded-lg px-4 py-3 text-[14px] text-gray-700 outline-none focus:border-[#7a0d0d] transition-colors" />
            </div>
            {error && <p className="text-[13px] text-red-600">{error}</p>}
            <button onClick={handleSignUp} disabled={loading} className="w-full bg-[#7a0d0d] hover:bg-[#5e0909] disabled:opacity-60 text-white text-[15px] font-semibold py-4 rounded-lg transition-colors mt-2">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>
          <p className="text-[13px] text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <span onClick={() => navigate("/signin")} className="text-[#7a0d0d] underline cursor-pointer">Sign in</span>
          </p>
        </div>
      </main>
      <footer className="border-t border-black/10 px-8 py-6">
        <p className="text-[#7a0d0d] text-[14px] font-bold mb-1">ResumeBot</p>
        <p className="text-gray-400 text-[13px]">© 2026 ResumeBot. Built for the Scholarly Architect.</p>
      </footer>
    </div>
  );
}