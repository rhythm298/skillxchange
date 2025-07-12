export type UserRole = 'user' | 'admin';
export type ProfileVisibility = 'public' | 'private';
export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  role: UserRole;
  skillsOffered: string[];
  skillsWanted: string[];
  rating?: number;
  profileVisibility: ProfileVisibility;
  createdAt: number;
  lastActive: number;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  offeredSkill: string;
  wantedSkill: string;
  message: string;
  status: RequestStatus;
  createdAt: number;
}

export interface SystemMessage {
  id: string;
  title: string;
  content: string;
  type: 'update' | 'warning' | 'info';
  timestamp: number;
  expiresAt: number;
}

export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  swapRequestId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
} 