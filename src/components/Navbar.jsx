import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "History", path: "/history" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white border-b border-black/10 flex items-center px-8 h-[52px]">
      <span
        onClick={() => navigate("/")}
        className="text-[#7a0d0d] text-[13px] font-black tracking-widest uppercase mr-8 cursor-pointer"
      >
        ResumeBot
      </span>
      <div className="flex items-center gap-6 flex-1">
        {links.map(({ label, path }) => (
          <a
            key={label}
            onClick={() => navigate(path)}
            className={`text-[14px] cursor-pointer ${
              location.pathname === path
                ? "text-[#7a0d0d] border-b-2 border-[#7a0d0d] pb-[2px]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/signin")}
          className="text-[14px] text-gray-500 hover:text-gray-800"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signin")}
          className="bg-[#7a0d0d] hover:bg-[#5e0909] text-white text-[13px] font-semibold px-4 py-2 rounded-md transition-colors"
        >
          Create Resume
        </button>
      </div>
    </nav>
  );
}