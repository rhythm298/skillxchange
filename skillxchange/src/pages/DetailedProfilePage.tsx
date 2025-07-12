import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SkillChip from "../components/SkillChip";
import RequestModal from "../components/RequestModal";
import { getUserProfile } from "../lib/api";
import { UserProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";

const DetailedProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile | null>(null);

  useEffect(() => {
    if (id) {
      getUserProfile(id).then(setProfile);
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then(setCurrentUserProfile);
    }
  }, [user]);

  if (!profile) return <div>Loading...</div>;

  const canRequest = !!user;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-3xl px-4 py-6 mx-auto space-y-4 bg-white rounded shadow">
        <div className="flex items-center gap-4">
          <img
            src={profile.profilePhoto || "https://via.placeholder.com/80"}
            alt={profile.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-gray-500">
              Rating: {profile.rating ?? "N/A"}/5
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Skills Offered</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.skillsOffered.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Skills Wanted</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.skillsWanted.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>
        </div>
        {/* Past feedback placeholder */}
        {canRequest && currentUserProfile && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-sm text-white bg-green-600 rounded"
          >
            Request Swap
          </button>
        )}
      </main>
      {currentUserProfile && profile && (
        <RequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          targetUser={profile}
          currentUserProfile={currentUserProfile}
        />
      )}
    </div>
  );
};

export default DetailedProfilePage;
 