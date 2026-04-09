import { ContactInfo } from "@/lib/types";
import Link from "next/link";

interface Props {
  contact: ContactInfo;
}

export default function ResumeHeader({ contact }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      {/* Left: name + success badge */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-heading">{contact.name}</h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
          <CheckCircleIcon className="w-3.5 h-3.5" />
          <span>
            We&apos;ve extracted and organised your resume into sections below.
          </span>
        </div>
      </div>

      {/* Right: download button + avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center gap-2 text-xs font-medium text-heading border border-border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
          <DownloadIcon className="w-3.5 h-3.5" />
          Download Extracted Text
        </button>
        <div className="w-8 h-8 rounded-full bg-[#1a2035] text-white text-xs font-semibold flex items-center justify-center">
          {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
