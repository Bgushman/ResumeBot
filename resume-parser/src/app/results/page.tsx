"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadResume } from "@/lib/resumeStore";
import { MOCK_RESUME } from "@/lib/mockData";
import { ParsedResume } from "@/lib/types";

import ResumeHeader from "@/components/ResumeHeader";
import SectionCard from "@/components/SectionCard";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import ExperienceItem from "@/components/ExperienceItem";
import SkillsList from "@/components/SkillsList";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import JobMatchPanel from "@/components/JobMatchPanel";

export default function ResultsPage() {
  const router = useRouter();
  const [resume, setResume] = useState<ParsedResume | null>(null);

  useEffect(() => {
    // Fall back to mock data so the page works even if visited directly
    const data = loadResume() ?? MOCK_RESUME;
    setResume(data);
  }, []);

  if (!resume) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-6 max-w-3xl w-full mx-auto">
      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-heading">Resume Parsed</h2>
          <button
            onClick={() => router.push("/")}
            className="text-xs font-medium text-heading border border-border rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
          >
            Edit Sections
          </button>
        </div>
        <ResumeHeader contact={resume.contact} />
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <SectionCard icon={<UserIcon className="w-4 h-4" />} title="Contact Information">
          <ContactSection contact={resume.contact} />
        </SectionCard>

        <SectionCard icon={<AcademicCapIcon className="w-4 h-4" />} title="Education">
          <EducationSection education={resume.education} />
        </SectionCard>

        <SectionCard icon={<BriefcaseIcon className="w-4 h-4" />} title="Experience">
          {resume.experience.map((item, i) => (
            <ExperienceItem key={i} item={item} />
          ))}
        </SectionCard>

        <SectionCard icon={<TagIcon className="w-4 h-4" />} title="Skills">
          <SkillsList skills={resume.skills} />
        </SectionCard>

        <SectionCard icon={<CodeIcon className="w-4 h-4" />} title="Projects">
          <ProjectsSection projects={resume.projects} />
        </SectionCard>

        <SectionCard icon={<BadgeIcon className="w-4 h-4" />} title="Certifications">
          <CertificationsSection certifications={resume.certifications} />
        </SectionCard>
      </div>

      {/* Job match panel */}
      <div className="mt-4">
        <JobMatchPanel />
      </div>
    </div>
  );
}

/* ── Icons ── */
function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
