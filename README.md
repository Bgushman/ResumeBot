# CS 520: Project Document Spring 2026

**Instructor:** Heather Conboy, University of Massachusetts Amherst  
**Team Name:** ResumeBot  

**Team Members:** 

* Shiven Patel / Shiven110504  
* Breanna Gushman / Bgushman  
* Khushi Rajoria / krajoria  
* Atonbara Diete-Koki / atonbara-adora  

**Links:** 

* **Google Drive Project Document:** [Drive Link](https://drive.google.com/drive/shared-drives1)  
* **GitHub Repo:** [Repo Link](https://github.com/Bgushman/ResumeBot2)  

---

## Requirements

### Overview
> *Provide a concise description (1–2 paragraphs) of: The problem your system addresses, the target users and stakeholders, the primary objectives of the system, and how it serves the Five College community clearly explains why this system is needed.*

ResumeBot addresses the challenge many students across the Five College Consortium face when creating competitive, field-specific resumes without access to personalized, timely feedback. Career advising offices provide valuable services, but appointment availability can be limited, especially during peak internship and job recruiting seasons. Students often struggle to tailor their resumes to industry expectations specific to their major or career path. ResumeBot provides an AI-powered solution that delivers structured, discipline-specific feedback based on a student’s academic background and resume content, making professional guidance more accessible and scalable.

The primary users of ResumeBot are undergraduate and graduate students across the Five College Consortium seeking resume improvement, while stakeholders include career services staff, faculty advisors, and employers who benefit from stronger applicant materials. The system’s main objectives are to provide accessible, major-specific resume feedback, highlight strengths and gaps, and guide students in improving clarity, formatting, and impact. By offering instant, personalized feedback available at any time, ResumeBot supplements existing campus career resources and promotes equitable access to professional development tools across the entire Five College community.

---

### Features
> *List at least four (4) major system features. Features should be high-level capabilities (not implementation details).*

* **Resume Upload & Parsing:** Ability to upload files and extract text/sections reliably.
* **Major & Career Path Profiling:** Tailoring rubrics and analysis based on the user's specific discipline.
* **Section-by-Section Feedback:** Detailed critique and suggestions for individual resume components.
* **Job Description Tailoring Mode:** Comparing a resume against a target job description for gap analysis.

---

### Functional Requirements (Use Cases)
> *Provide at least eight (8) formal use cases. Each use case must include: Actor, Trigger, Main Success Scenario, and Any Failure Cases. Use cases must be specific, testable, and traceable to features.*

| Actor | Trigger | Success Scenario | Failure Cases |
| :--- | :--- | :--- | :--- |
| **Student** | Student clicks "Upload Resume" and selects a PDF/DOCX file | System parses the resume and displays a structured preview confirming sections detected (Education, Experience, Skills, etc.) | File format unsupported; file exceeds size limit; parsing fails due to unusual formatting |
| **Student** | Student completes the onboarding profile form with major, graduation year, and target industry | System saves the profile and customizes feedback rubric to match discipline-specific standards (e.g., CS vs. Social Work) | Student leaves required fields blank; selected major has no configured rubric yet |
| **Student** | Student clicks "Analyze My Resume" after uploading | System returns structured feedback for each section (e.g., "Your bullet points lack measurable impact — add quantifiable results") | Resume text cannot be extracted; AI service is unavailable; response times out |
| **Student** | Student pastes a job description URL or text into the "Job Match" field | System compares resume keywords and experience to the job description and returns a gap analysis with suggested edits | Job description URL is broken or behind a login wall; description is too vague to analyze |
| **Student** | Student navigates to "My Past Reviews" in their dashboard | System displays a chronological list of prior resume submissions with their feedback summaries | Student has no prior submissions; session has expired and student must re-authenticate |
| **Student** | Student clicks "Download Report" on a completed review | System generates and downloads a formatted PDF summary of all feedback | PDF generation service fails; no feedback exists yet for that submission |
| **Student** | Student uploads a new version of their resume after making edits | System compares the new version to the previous one and highlights what improved and what still needs work | No prior version exists to compare against; file is identical to the previous upload |
| **Student** | Student clicks "Check ATS Score" after uploading their resume | System scans the resume for ATS-friendly formatting and keyword density and returns a score with specific fixes | Resume uses heavy graphics or tables that block scanning; AI scoring service times out |

---

### Non-Functional Requirements

* **Response Time:** The AI chatbot must return feedback within 15 seconds of a user message, assuming standard network conditions.
* **PDF Processing:** The system must successfully parse and extract text from at least 90% of standard single- and multi-column PDF resumes under 5 MB.
* **Availability:** The system must maintain at least 99% uptime during the academic semester, excluding scheduled maintenance windows.

---

### Challenges & Risks

* **AI Response Quality and Consistency:** LLM outputs can be inconsistent or hallucinate inaccurate advice across sessions. We will mitigate this through carefully engineered major-specific system prompts and manual evaluation of feedback quality across supported majors before launch.
* **PDF Parsing Reliability:** Resumes vary widely in layout — multi-column designs, tables, and scanned documents often produce garbled extracted text, degrading AI feedback quality. We will use a robust parser (PyMuPDF or pdfplumber) and display extracted text to users for confirmation before starting a review.
* **Data Privacy:** Resumes contain PII transmitted to external APIs and stored in our database. We will inform users about data handling, restrict access to the owning user, and implement automatic deletion after a retention period.
