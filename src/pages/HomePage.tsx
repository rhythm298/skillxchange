import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import { UserProfile } from '../types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          where('profileVisibility', '==', 'public')
        );
        const querySnapshot = await getDocs(q);
        const fetchedProfiles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<UserProfile, 'id'>)
        }));
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading profiles...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Skills</h1>
        
        {profiles.length === 0 ? (
          <div className="text-center text-gray-600">
            No profiles available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                canRequest={!!user}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage; 