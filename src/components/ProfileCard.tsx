import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  canRequest: boolean;
}

const SkillChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
    {label}
  </span>
);

const ProfileCard: React.FC<Props> = ({ profile, canRequest }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={profile.profilePhoto || `https://randomuser.me/api/portraits/lego/1.jpg`}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-500">Skills Offered:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.skillsOffered.map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-500">Skills Wanted:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.skillsWanted.map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">
                {profile.rating ? profile.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
            <Link
              to={`/users/${profile.id}`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                canRequest
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Request Swap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 