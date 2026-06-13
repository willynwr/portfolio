export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  type: "full-time" | "freelance" | "internship";
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "PT Telekomunikasi Selular (Telkomsel)",
    period: "Dec 2025 – Present",
    type: "full-time",
    highlights: [
      "Built and maintained Blanjapoin.id, Tokodigi.id, admin.tokodigi.id, rafi.tokodigi.id",
      "Developed AI-powered customer verification system (FastAPI + InsightFace + OpenAI API + Docker)",
      "Managed production Linux VPS infrastructure, Nginx, SSL, Docker deployment",
    ],
  },
  {
    id: 2,
    title: "Freelance Website Developer",
    company: "Self-Employed",
    period: "Jan 2026 – Present",
    type: "freelance",
    highlights: [
      "Developed KuotaUmroh.id — roaming package platform for Hajj/Umrah travelers",
      "Built OfficeVTuber.my.id — staff attendance & reporting system with RBAC",
    ],
  },
  {
    id: 3,
    title: "Internship Website Developer",
    company: "Telkomsel",
    period: "Jul 2025 – Dec 2025",
    type: "internship",
    highlights: [
      "Full-stack development on Blanjapoin.id loyalty platform",
      "Front-end development on Online Travel Management System",
    ],
  },
  {
    id: 4,
    title: "Internship IT App Developer",
    company: "CV DBKLIK",
    period: "Jan 2025 – Jun 2025",
    type: "internship",
    highlights: [
      "Built backend modules for internal HRIS system using Laravel",
      "Implemented employee data management, attendance, and leave request features",
    ],
  },
];
