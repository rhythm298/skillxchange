import { getSkillCategory } from "@/data/mockUsers";

interface SkillTagProps {
  skill: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}

export const SkillTag = ({ skill, size = "md", variant = "default" }: SkillTagProps) => {
  const category = getSkillCategory(skill);
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  const baseClasses = `skill-tag ${sizeClasses[size]} skill-${category}`;
  
  return (
    <span className={baseClasses}>
      {skill}
    </span>
  );
};