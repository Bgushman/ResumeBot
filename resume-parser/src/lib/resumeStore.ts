import { ParsedResume } from "./types";

const KEY = "resumebot_parsed";

export function saveResume(data: ParsedResume): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function loadResume(): ParsedResume | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ParsedResume;
  } catch {
    return null;
  }
}
