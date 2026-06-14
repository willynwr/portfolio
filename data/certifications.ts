export interface Certification {
  id: number;
  name: string;
  issuer: string;
  category: "cloud" | "ai" | "language" | "data" | "dev" | "internship";
  icon: string;
  logo?: string;
}

export const certifications: Certification[] = [
  // ── BNSP ─────────────────────────────────────────────────
  {
    id: 1,
    name: "Cloud Computing Engineer Professional",
    issuer: "BNSP",
    category: "cloud",
    icon: "☁️",
    logo: "/bnsp.png",
  },
  // ── Huawei ───────────────────────────────────────────────
  {
    id: 2,
    name: "Huawei Certified ICT Associate Cloud Service (HCIA)",
    issuer: "Huawei",
    category: "cloud",
    icon: "🏆",
    logo: "/huawei.png",
  },
  // ── DQLab ────────────────────────────────────────────────
  {
    id: 3,
    name: "Data Science Challenge with Python",
    issuer: "DQLab × CT Corp",
    category: "data",
    icon: "📊",
    logo: "/dqlab.jpg",
  },
  // ── Dicoding ─────────────────────────────────────────────
  {
    id: 4,
    name: "Cloud & Gen AI on AWS",
    issuer: "Dicoding",
    category: "cloud",
    icon: "🌩️",
    logo: "/dicoding.png",
  },
  {
    id: 5,
    name: "Back-End JavaScript Developer",
    issuer: "Dicoding",
    category: "dev",
    icon: "⚡",
    logo: "/dicoding.png",
  },
  {
    id: 6,
    name: "JavaScript Basics",
    issuer: "Dicoding",
    category: "dev",
    icon: "🟨",
    logo: "/dicoding.png",
  },
  // ── Digital Talent Scholarship ───────────────────────────
  {
    id: 7,
    name: "Cloud Computing",
    issuer: "Digital Talent Scholarship",
    category: "cloud",
    icon: "☁️",
    logo: "/digitalent.png",
  },
  {
    id: 8,
    name: "Deep Learning",
    issuer: "Digital Talent Scholarship",
    category: "ai",
    icon: "🧠",
    logo: "/digitalent.png",
  },
  {
    id: 9,
    name: "Artificial Intelligence (Micro Skill)",
    issuer: "Digital Talent Scholarship",
    category: "ai",
    icon: "🤖",
    logo: "/digitalent.png",
  },
  // ── PENS ─────────────────────────────────────────────────
  {
    id: 10,
    name: "PENS English Proficiency Test (PEPT)",
    issuer: "PENS — Score 477",
    category: "language",
    icon: "📝",
    logo: "/pens.png",
  },
  // ── Internship ───────────────────────────────────────────
  {
    id: 11,
    name: "Internship Certificate",
    issuer: "CV DBKlik",
    category: "internship",
    icon: "🏢",
    logo: "/dbklik.png",
  },
  {
    id: 12,
    name: "Internship Certificate",
    issuer: "PT Telekomunikasi Selular (Telkomsel)",
    category: "internship",
    icon: "📡",
    logo: "/telkomsel.png",
  },
];
