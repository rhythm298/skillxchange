import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';

const dummyUsers: Omit<UserProfile, 'id'>[] = [
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/women/1.jpg",
    role: "user",
    skillsOffered: ["Web Design", "UI/UX", "Photoshop"],
    skillsWanted: ["JavaScript", "React", "Node.js"],
    rating: 4.5,
    profileVisibility: "public",
    createdAt: Date.now(),
    lastActive: Date.now()
  },
  {
    name: "Michael Chen",
    email: "m.chen@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/men/2.jpg",
    role: "user",
    skillsOffered: ["Python", "Data Analysis", "Machine Learning"],
    skillsWanted: ["Web Design", "Digital Marketing", "Content Writing"],
    rating: 4.8,
    profileVisibility: "public",
    createdAt: Date.now(),
    lastActive: Date.now()
  },
  {
    name: "Emma Wilson",
    email: "emma.w@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/women/3.jpg",
    role: "user",
    skillsOffered: ["Digital Marketing", "Social Media", "Content Strategy"],
    skillsWanted: ["Photography", "Video Editing", "Graphic Design"],
    rating: 4.2,
    profileVisibility: "public",
    createdAt: Date.now(),
    lastActive: Date.now()
  },
  {
    name: "David Kim",
    email: "d.kim@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/men/4.jpg",
    role: "user",
    skillsOffered: ["Mobile Development", "React Native", "iOS Development"],
    skillsWanted: ["UI Design", "UX Research", "Product Management"],
    rating: 4.7,
    profileVisibility: "public",
    createdAt: Date.now(),
    lastActive: Date.now()
  },
  {
    name: "Lisa Martinez",
    email: "lisa.m@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/women/5.jpg",
    role: "user",
    skillsOffered: ["Content Writing", "Copywriting", "Blog Management"],
    skillsWanted: ["SEO", "WordPress", "Social Media Marketing"],
    rating: 4.4,
    profileVisibility: "public",
    createdAt: Date.now(),
    lastActive: Date.now()
  },
  {
    name: "James Wilson",
    email: "j.wilson@example.com",
    profilePhoto: "https://randomuser.me/api/portraits/men/6.jpg",
    role: "user",
    skillsOffered: ["Video Editing", "Animation", "Motion Graphics"],
    skillsWanted: ["3D Modeling", "Sound Design", "Scriptwriting"],
    rating: 4.6,
    profileVisibility: "public",
    createdAt: Date.now(),
    lastActive: Date.now()
  }
];

export const seedDatabase = async () => {
  try {
    const usersCollection = collection(db, 'users');
    
    // Add each dummy user to the database
    for (const user of dummyUsers) {
      await addDoc(usersCollection, user);
    }
    
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}; 