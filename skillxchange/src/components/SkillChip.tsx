import React from "react";

const SkillChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
    {label}
  </span>
);

export default SkillChip;
