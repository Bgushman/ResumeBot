"use client";

import { useState } from "react";

export default function JobMatchPanel() {
  const [description, setDescription] = useState("");

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h2 className="font-semibold text-heading text-sm mb-1">
        Compare to a Job Description <span className="text-muted font-normal">(Optional)</span>
      </h2>
      <p className="text-xs text-muted mb-3">
        Paste a job description to see how well your resume matches.
      </p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Paste job description here…"
        rows={4}
        className="w-full rounded-lg border border-border text-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 placeholder:text-gray-400"
      />
      <div className="flex justify-end mt-3">
        <button
          disabled={!description.trim()}
          className="flex items-center gap-2 text-sm font-medium bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
        >
          <SparkleIcon className="w-4 h-4" />
          Analyze Match
        </button>
      </div>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
