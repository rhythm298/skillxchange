export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  profilePhoto?: string;
  availability?: 'weekends' | 'evenings' | 'anytime';
  skillsOffered: string[];
  skillsWanted: string[];
  profileVisibility: 'public' | 'private';
  rating?: number;
  createdAt: number;
  lastActive?: number;
  banned?: boolean;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  offeredSkill: string;
  wantedSkill: string;
  message?: string;
  status: RequestStatus;
  timestamp: number;
  feedback?: {
    rating: number;
    comment: string;
    givenAt: number;
  };
}

export interface SystemMessage {
  id: string;
  title: string;
  content: string;
  type: 'update' | 'alert' | 'maintenance';
  timestamp: number;
  expiresAt?: number;
}
