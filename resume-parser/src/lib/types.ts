export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ExperienceItem {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Project {
  name: string;
  tech: string[];
  bullets: string[];
}

export interface Certification {
  name: string;
  issuer?: string;
  year: string;
}

export interface ParsedResume {
  contact: ContactInfo;
  education: Education[];
  experience: ExperienceItem[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}
