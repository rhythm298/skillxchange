import React from "react";
import { Link } from "react-router-dom";
import { UserProfile } from "../types";
import SkillChip from "./SkillChip";

interface Props {
  profile: UserProfile;
  canRequest: boolean;
}

const ProfileCard: React.FC<Props> = ({ profile, canRequest }) => (
  <div className="p-4 bg-white border rounded shadow-sm">
    <div className="flex items-center gap-4">
      <img
        src={profile.profilePhoto || `https://via.placeholder.com/64?text=User`}
        alt={profile.name}
        className="w-16 h-16 rounded-full"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{profile.name}</h3>
        <p className="text-sm text-gray-500">
          Rating: {profile.rating ?? "N/A"}/5
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {profile.skillsOffered.slice(0, 3).map((skill) => (
            <SkillChip key={skill} label={skill} />
          ))}
          {profile.skillsOffered.length > 3 && (
            <span className="text-xs">+more</span>
          )}
        </div>
      </div>
      <Link
        to={`/users/${profile.id}`}
        className={`px-3 py-2 text-sm font-semibold text-white rounded ${
          canRequest
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Request
      </Link>
    </div>
  </div>
);

export default ProfileCard;
