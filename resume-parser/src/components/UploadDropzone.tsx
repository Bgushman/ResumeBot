"use client";

import { useCallback, useRef, useState } from "react";

interface Props {
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
}

export default function UploadDropzone({ onFileSelected, selectedFile }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed cursor-pointer transition-colors p-12 select-none
        ${isDragging
          ? "border-accent bg-accent/5"
          : "border-gray-300 bg-white hover:border-accent hover:bg-accent/5"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
        <UploadCloudIcon className="w-8 h-8 text-accent" />
      </div>

      {selectedFile ? (
        <div className="text-center">
          <p className="font-semibold text-heading">{selectedFile.name}</p>
          <p className="text-sm text-muted mt-1">
            {(selectedFile.size / 1024).toFixed(0)} KB · Click or drop to replace
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-semibold text-heading">
            Drag &amp; drop your resume here
          </p>
          <p className="text-sm text-muted mt-1">
            or <span className="text-accent underline">browse files</span>
          </p>
          <p className="text-xs text-muted mt-2">PDF or DOCX · Max 10 MB</p>
        </div>
      )}
    </div>
  );
}

function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}
