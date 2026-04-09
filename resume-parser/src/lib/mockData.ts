import { ParsedResume } from "./types";

export const MOCK_RESUME: ParsedResume = {
  contact: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (512) 555-0182",
    location: "New York, NY",
    linkedin: "linkedin.com/in/alexjohnson",
  },
  education: [
    {
      institution: "University of Massachusetts Amherst",
      degree: "B.S.",
      field: "Computer Science",
      startDate: "Aug 2021",
      endDate: "May 2025",
      gpa: "3.7/4.0",
    },
  ],
  experience: [
    {
      company: "TechCorp",
      title: "Software Engineering Intern",
      startDate: "May 2024",
      endDate: "Aug 2024",
      bullets: [
        "Built a REST API response caching layer using React and TypeScript",
        "Improved API response time by 20% through query optimisation",
        "Collaborated with a team of 8 engineers on a microservices migration",
      ],
    },
    {
      company: "UMass Amherst",
      title: "Teaching Assistant",
      startDate: "Jan 2023",
      endDate: "May 2024",
      bullets: [
        "Led weekly recitations for 30+ students in Data Structures & Algorithms",
        "Helped 50+ students improve their understanding of core CS concepts",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Python",
    "SQL",
    "Git",
    "HTML",
    "CSS",
  ],
  projects: [
    {
      name: "Course Scheduler Web App",
      tech: ["React", "Node.js", "MongoDB", "GitHub"],
      bullets: [
        "A web app for students to plan and track courses",
        "Displays real-time enrollment and 4-day forecasts",
      ],
    },
    {
      name: "Weather Dashboard",
      tech: ["JavaScript", "OpenWeather API", "GitHub"],
      bullets: [
        "Displays real-time weather and 5-day forecasts",
      ],
    },
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      year: "2023",
    },
  ],
};
