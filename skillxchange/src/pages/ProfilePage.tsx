import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SkillChip from "../components/SkillChip";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile, saveUserProfile } from "../lib/api";
import { UserProfile } from "../types";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getUserProfile(user.uid);
      if (data) {
        setProfile(data);
        setLocalProfile(data);
      }
    })();
  }, [user]);

  const handleSave = async () => {
    if (!localProfile) return;
    await saveUserProfile(localProfile);
    setProfile(localProfile);
    setEditing(false);
  };

  if (!profile) return <div>Loading...</div>;

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
          {editing ? (
            <input
              className="text-xl font-semibold"
              value={localProfile?.name ?? ""}
              onChange={(e) =>
                setLocalProfile((p) => (p ? { ...p, name: e.target.value } : p))
              }
            />
          ) : (
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
          )}
        </div>
        <div>
          <h3 className="font-semibold">Skills Offered</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.skillsOffered.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>
        </div>
        {/* Similar sections for skills wanted, availability, etc. */}
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-green-600 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setLocalProfile(profile);
                  setEditing(false);
                }}
                className="px-4 py-2 text-sm bg-gray-200 rounded"
              >
                Discard
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded"
            >
              Edit Profile
            </button>
          )}
          <button
            className="px-4 py-2 text-sm text-white bg-purple-600 rounded"
            onClick={() => (window.location.href = "/requests")}
          >
            Swap Requests
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
