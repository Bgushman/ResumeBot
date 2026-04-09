"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadDropzone from "@/components/UploadDropzone";
import { MOCK_RESUME } from "@/lib/mockData";
import { saveResume } from "@/lib/resumeStore";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setError(null);
    setLoading(true);

    // Simulate 1-second parsing delay
    await new Promise((r) => setTimeout(r, 1000));

    saveResume(MOCK_RESUME);
    router.push("/results");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-heading">Upload Your Resume</h1>
          <p className="mt-2 text-sm text-muted">
            We&apos;ll extract and organise your resume into sections below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <UploadDropzone onFileSelected={setFile} selectedFile={file} />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors"
          >
            {loading ? (
              <>
                <SpinnerIcon className="w-4 h-4 animate-spin" />
                Parsing resume…
              </>
            ) : (
              "Parse Resume"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
