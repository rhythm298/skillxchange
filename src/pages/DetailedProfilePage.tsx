import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import Header from '../components/Header';
import RequestModal from '../components/RequestModal';
import toast from 'react-hot-toast';

const DetailedProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!id) {
          navigate('/');
          return;
        }

        // Fetch target user profile
        const profileDoc = await getDoc(doc(db, 'users', id));
        if (!profileDoc.exists()) {
          toast.error('User not found');
          navigate('/');
          return;
        }
        setProfile({
          id: profileDoc.id,
          ...(profileDoc.data() as Omit<UserProfile, 'id'>)
        });

        // Fetch current user profile if logged in
        if (user) {
          const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
          if (currentUserDoc.exists()) {
            setCurrentUserProfile({
              id: currentUserDoc.id,
              ...(currentUserDoc.data() as Omit<UserProfile, 'id'>)
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading profile...</div>
        </main>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-6">
              <img
                src={profile.profilePhoto || `https://randomuser.me/api/portraits/lego/1.jpg`}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">
                    {profile.rating ? profile.rating.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Offered</h2>
                <div className="space-y-2">
                  {profile.skillsOffered.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Wanted</h2>
                <div className="space-y-2">
                  {profile.skillsWanted.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-md"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {user && currentUserProfile && user.uid !== profile.id && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Request Skill Swap
                </button>
              </div>
            )}
          </div>
        </div>

        {currentUserProfile && (
          <RequestModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            targetUser={profile}
            currentUserProfile={currentUserProfile}
          />
        )}
      </main>
    </div>
  );
};

export default DetailedProfilePage; 