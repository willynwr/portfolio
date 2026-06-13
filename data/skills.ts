export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "",
    skills: ["PHP", "Python", "JavaScript", "TypeScript"],
  },
  {
    name: "Frameworks",
    icon: "",
    skills: ["Laravel", "Slim PHP", "FastAPI", "Bootstrap", "Tailwind CSS", "Alpine JS", "Next JS", "React JS"],
  },
  {
    name: "Infrastructure",
    icon: "",
    skills: ["Docker", "Git", "Linux", "Nginx", "VPS", "SSL", "AWS"],
  },
  {
    name: "Databases",
    icon: "",
    skills: ["MySQL", "Firebase"],
  },
  {
    name: "AI & IoT",
    icon: "",
    skills: [
      "OpenAI API",
      "InsightFace",
      "Machine Learning",
      "Deep Learning",
      "LoRa",
      "ESP32",
      "Raspberry Pi",
      "Firebase",
    ],
  },
  {
    name: "Design",
    icon: "",
    skills: ["Figma", "UI/UX"],
  },
];
