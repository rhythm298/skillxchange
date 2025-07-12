import { User, SwapRequest, Skill, Rating } from '../types';

export const dummySkills: Skill[] = [
  { id: 'skill1', name: 'JavaScript Programming', category: 'Programming' },
  { id: 'skill2', name: 'React Development', category: 'Programming' },
  { id: 'skill3', name: 'Python Programming', category: 'Programming' },
  { id: 'skill4', name: 'Digital Marketing', category: 'Marketing' },
  { id: 'skill5', name: 'Content Writing', category: 'Writing' },
  { id: 'skill6', name: 'Graphic Design', category: 'Design' },
  { id: 'skill7', name: 'UI/UX Design', category: 'Design' },
  { id: 'skill8', name: 'Video Editing', category: 'Multimedia' },
  { id: 'skill9', name: 'Photography', category: 'Multimedia' },
  { id: 'skill10', name: 'Data Analysis', category: 'Data Science' }
];

export const dummyUsers: User[] = [
  {
    id: 'user1',
    email: 'john.doe@example.com',
    displayName: 'John Doe',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    location: 'New York, USA',
    bio: 'Full-stack developer with 5 years of experience. Love teaching and learning new technologies.',
    skills: ['skill1', 'skill2'],
    skillsWanted: ['skill6', 'skill7'],
    isProfilePublic: true,
    role: 'user',
    createdAt: new Date().toISOString(),
    averageRating: 4.8
  },
  {
    id: 'user2',
    email: 'jane.smith@example.com',
    displayName: 'Jane Smith',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    location: 'London, UK',
    bio: 'UI/UX designer passionate about creating beautiful and functional interfaces.',
    skills: ['skill6', 'skill7'],
    skillsWanted: ['skill1', 'skill3'],
    isProfilePublic: true,
    role: 'user',
    createdAt: new Date().toISOString(),
    averageRating: 4.5
  },
  {
    id: 'user3',
    email: 'admin@skillxchange.com',
    displayName: 'Admin User',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    location: 'San Francisco, USA',
    bio: 'Platform administrator and community manager.',
    skills: ['skill1', 'skill2', 'skill3', 'skill4'],
    skillsWanted: ['skill8', 'skill9'],
    isProfilePublic: true,
    role: 'admin',
    createdAt: new Date().toISOString(),
    averageRating: 5.0
  },
  {
    id: 'user4',
    email: 'sarah.wilson@example.com',
    displayName: 'Sarah Wilson',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    location: 'Toronto, Canada',
    bio: 'Digital marketing specialist with expertise in social media and content strategy.',
    skills: ['skill4', 'skill5'],
    skillsWanted: ['skill8', 'skill6'],
    isProfilePublic: true,
    role: 'user',
    createdAt: new Date().toISOString(),
    averageRating: 4.7
  },
  {
    id: 'user5',
    email: 'mike.brown@example.com',
    displayName: 'Mike Brown',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    location: 'Sydney, Australia',
    bio: 'Video editor and photographer. Always looking to expand my programming skills.',
    skills: ['skill8', 'skill9'],
    skillsWanted: ['skill1', 'skill2'],
    isProfilePublic: true,
    role: 'user',
    createdAt: new Date().toISOString(),
    averageRating: 4.6
  }
];

export const dummySwapRequests: SwapRequest[] = [
  {
    id: 'swap1',
    fromUserId: 'user1',
    toUserId: 'user2',
    fromSkill: 'skill1',
    toSkill: 'skill6',
    status: 'pending',
    message: 'Would love to learn UI/UX design basics in exchange for JavaScript mentoring!',
    createdAt: new Date().toISOString()
  },
  {
    id: 'swap2',
    fromUserId: 'user4',
    toUserId: 'user5',
    fromSkill: 'skill4',
    toSkill: 'skill8',
    status: 'accepted',
    message: 'Interested in exchanging digital marketing knowledge for video editing skills.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'swap3',
    fromUserId: 'user2',
    toUserId: 'user3',
    fromSkill: 'skill7',
    toSkill: 'skill3',
    status: 'completed',
    message: 'Would like to learn Python in exchange for UI/UX design principles.',
    createdAt: new Date().toISOString()
  }
];

export const dummyRatings: Rating[] = [
  {
    id: 'rating1',
    fromUserId: 'user1',
    toUserId: 'user2',
    swapRequestId: 'swap1',
    rating: 5,
    comment: 'Excellent teacher! Really helped me understand UI/UX fundamentals.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rating2',
    fromUserId: 'user2',
    toUserId: 'user1',
    swapRequestId: 'swap1',
    rating: 4,
    comment: 'Great JavaScript mentor, very patient and knowledgeable.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rating3',
    fromUserId: 'user4',
    toUserId: 'user5',
    swapRequestId: 'swap2',
    rating: 5,
    comment: 'Amazing video editing skills and teaching style!',
    createdAt: new Date().toISOString()
  }
]; 