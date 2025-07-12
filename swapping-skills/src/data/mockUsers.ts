export interface User {
  id: string;
  name: string;
  location: string;
  profilePicture: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  rating: number;
  completedSwaps: number;
  bio: string;
  joinedDate: string;
}

const skillCategories = {
  programming: ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Web Design'],
  design: ['UI/UX Design', 'Graphic Design', 'Illustration', 'Photography', 'Video Editing'],
  music: ['Guitar', 'Piano', 'Singing', 'Music Production', 'Songwriting'],
  cooking: ['Italian Cuisine', 'Baking', 'Vegetarian Cooking', 'Wine Pairing', 'Meal Planning'],
  fitness: ['Personal Training', 'Yoga', 'Martial Arts', 'Nutrition', 'Running Coach'],
  language: ['Spanish', 'French', 'German', 'Japanese', 'English Tutoring'],
  business: ['Marketing', 'Sales', 'Project Management', 'Public Speaking', 'Financial Planning'],
  crafts: ['Woodworking', 'Pottery', 'Knitting', 'Jewelry Making', 'Gardening']
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    location: 'San Francisco, CA',
    profilePicture: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
    skillsOffered: ['JavaScript', 'React', 'UI/UX Design'],
    skillsWanted: ['Guitar', 'Spanish', 'Photography'],
    availability: ['Weekends', 'Evenings'],
    isPublic: true,
    rating: 4.8,
    completedSwaps: 12,
    bio: 'Full-stack developer passionate about creating beautiful user experiences. Always eager to learn new skills!',
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Maya Chen',
    location: 'New York, NY',
    profilePicture: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    skillsOffered: ['Piano', 'Music Production', 'Songwriting'],
    skillsWanted: ['Web Design', 'Marketing', 'Italian Cuisine'],
    availability: ['Weekdays', 'Mornings'],
    isPublic: true,
    rating: 4.9,
    completedSwaps: 18,
    bio: 'Professional musician and composer. Love sharing the joy of music with others.',
    joinedDate: '2022-11-08'
  },
  {
    id: '3',
    name: 'Jordan Smith',
    location: 'Austin, TX',
    profilePicture: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
    skillsOffered: ['Photography', 'Video Editing', 'Graphic Design'],
    skillsWanted: ['Python', 'Machine Learning', 'Personal Training'],
    availability: ['Weekends', 'Flexible'],
    isPublic: true,
    rating: 4.7,
    completedSwaps: 9,
    bio: 'Creative professional specializing in visual storytelling. Always looking to expand my technical skills.',
    joinedDate: '2023-03-22'
  },
  {
    id: '4',
    name: 'Emma Johnson',
    location: 'Seattle, WA',
    profilePicture: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400',
    skillsOffered: ['Yoga', 'Nutrition', 'Meditation'],
    skillsWanted: ['Graphic Design', 'French', 'Baking'],
    availability: ['Mornings', 'Weekends'],
    isPublic: true,
    rating: 4.9,
    completedSwaps: 15,
    bio: 'Certified yoga instructor focused on holistic wellness. Believer in continuous learning and growth.',
    joinedDate: '2022-09-12'
  },
  {
    id: '5',
    name: 'Carlos Rodriguez',
    location: 'Miami, FL',
    profilePicture: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400',
    skillsOffered: ['Spanish', 'Salsa Dancing', 'Marketing'],
    skillsWanted: ['Guitar', 'Photography', 'Web Design'],
    availability: ['Evenings', 'Weekends'],
    isPublic: true,
    rating: 4.6,
    completedSwaps: 11,
    bio: 'Marketing professional and dance enthusiast. Love connecting with people through language and movement.',
    joinedDate: '2023-02-07'
  },
  {
    id: '6',
    name: 'Sophie Laurent',
    location: 'Los Angeles, CA',
    profilePicture: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
    skillsOffered: ['French', 'Wine Pairing', 'Illustration'],
    skillsWanted: ['Node.js', 'Public Speaking', 'Yoga'],
    availability: ['Weekdays', 'Flexible'],
    isPublic: true,
    rating: 4.8,
    completedSwaps: 14,
    bio: 'French expatriate and artist. Passionate about sharing culture and learning new technologies.',
    joinedDate: '2022-12-01'
  },
  {
    id: '7',
    name: 'David Kim',
    location: 'Chicago, IL',
    profilePicture: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
    skillsOffered: ['Python', 'Machine Learning', 'Data Analysis'],
    skillsWanted: ['Piano', 'Cooking', 'Japanese'],
    availability: ['Evenings', 'Weekends'],
    isPublic: true,
    rating: 4.7,
    completedSwaps: 8,
    bio: 'Data scientist by day, curious learner by night. Always excited to explore new domains.',
    joinedDate: '2023-04-15'
  },
  {
    id: '8',
    name: 'Luna Martinez',
    location: 'Denver, CO',
    profilePicture: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    skillsOffered: ['Woodworking', 'Pottery', 'Gardening'],
    skillsWanted: ['UI/UX Design', 'Music Production', 'French'],
    availability: ['Weekends', 'Mornings'],
    isPublic: true,
    rating: 4.9,
    completedSwaps: 16,
    bio: 'Artisan and maker. Believe in the power of creating with your hands and learning from others.',
    joinedDate: '2022-10-30'
  }
];

export const getSkillCategory = (skill: string): string => {
  for (const [category, skills] of Object.entries(skillCategories)) {
    if (skills.includes(skill)) {
      return category;
    }
  }
  return 'other';
};

export const getCurrentUser = (): User => {
  return {
    id: 'current',
    name: 'Your Name',
    location: 'Your City, State',
    profilePicture: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
    skillsOffered: ['JavaScript', 'Guitar'],
    skillsWanted: ['Spanish', 'Photography'],
    availability: ['Weekends'],
    isPublic: true,
    rating: 0,
    completedSwaps: 0,
    bio: 'Welcome to the skill exchange platform! Update your profile to get started.',
    joinedDate: new Date().toISOString().split('T')[0]
  };
};