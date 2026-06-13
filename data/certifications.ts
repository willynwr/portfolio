export interface Certification {
  id: number;
  name: string;
  issuer: string;
  category: "cloud" | "ai" | "language" | "data" | "dev";
  icon: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Cloud Computing Engineer Professional",
    issuer: "BNSP",
    category: "cloud",
    icon: "☁️",
  },
  {
    id: 2,
    name: "Huawei Certified ICT Associate Cloud Service (HCIA)",
    issuer: "Huawei",
    category: "cloud",
    icon: "🏆",
  },
  {
    id: 3,
    name: "Cloud Computing & Deep Learning",
    issuer: "Digital Talent Scholarship",
    category: "cloud",
    icon: "🎓",
  },
  {
    id: 4,
    name: "Artificial Intelligence (Micro Skill)",
    issuer: "Digital Talent Scholarship",
    category: "ai",
    icon: "🤖",
  },
  {
    id: 5,
    name: "PENS English Proficiency Test (PEPT)",
    issuer: "PENS — Score 477",
    category: "language",
    icon: "📝",
  },
  {
    id: 6,
    name: "Data Science Challenge with Python",
    issuer: "DQLab × CT Corp",
    category: "data",
    icon: "📊",
  },
  {
    id: 7,
    name: "Cloud & Gen AI on AWS",
    issuer: "Dicoding",
    category: "cloud",
    icon: "🌩️",
  },
  {
    id: 8,
    name: "Back-End JavaScript Developer",
    issuer: "Dicoding",
    category: "dev",
    icon: "⚡",
  },
  {
    id: 9,
    name: "JavaScript Basics",
    issuer: "Dicoding",
    category: "dev",
    icon: "🟨",
  },
];
