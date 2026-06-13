export interface Project {
  id: number;
  name: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  category: "iot" | "ai" | "web" | "system";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "SmartSoil Monitoring System",
    description:
      "IoT soil fertility recommendation system using spectral sensors and Random Forest with SHAP explainability. Features a Laravel dashboard, Firebase realtime sync, and Dockerized deployment.",
    stack: ["Laravel", "Firebase", "Random Forest", "SHAP", "Docker", "IoT", "ESP32"],
    github: "https://github.com/willynwr",
    category: "iot",
    featured: true,
  },
  {
    id: 2,
    name: "AI Customer Verification",
    description:
      "Facial recognition fraud prevention system for Tokodigi starter pack claims. Uses OpenAI photo validation with InsightFace for real-time identity verification.",
    stack: ["Python", "FastAPI", "InsightFace", "OpenAI API", "Docker"],
    category: "ai",
    featured: true,
  },
  {
    id: 3,
    name: "Blanjapoin.id",
    description:
      "Customer loyalty and point redemption platform integrated with MyTelkomsel. Supports millions of Telkomsel subscribers for reward management.",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    live: "https://blanjapoin.id",
    category: "web",
    featured: true,
  },
  {
    id: 4,
    name: "Tokodigi.id & Admin Tokodigi",
    description:
      "Official Telkomsel digital marketplace and internal admin panel. Handles product listings, orders, and complete admin dashboard.",
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    live: "https://tokodigi.id",
    category: "web",
  },
  {
    id: 5,
    name: "KuotaUmroh.id",
    description:
      "Roaming package e-commerce platform for Hajj/Umrah travelers, supporting 6 Indonesian carriers with seamless checkout and package comparison.",
    stack: ["Laravel", "PHP", "MySQL", "Alpine JS"],
    category: "web",
  },
  {
    id: 6,
    name: "OfficeVTuber.my.id",
    description:
      "Staff attendance and reporting system with role-based access control. Streamlines HR workflows and generates automated attendance reports.",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    category: "system",
  },
  {
    id: 7,
    name: "Online Travel Management System",
    description:
      "Internal Telkomsel platform for employee business trip requests, approvals, and travel expense management.",
    stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    category: "web",
  },
  {
    id: 8,
    name: "HRIS — Human Resources Information System",
    description:
      "Complete HR digitization platform for CV DBKLIK covering employee data, attendance tracking, leave requests, and RBAC.",
    stack: ["Laravel", "PHP", "MySQL"],
    category: "system",
  },
];
