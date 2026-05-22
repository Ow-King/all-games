export type Platform = 'PS5' | 'XSX' | 'Switch' | 'PC' | 'PS4' | 'XBO' | 'Mobile' | 'Other';

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  coverUrl?: string;
  genres: string[];
  developer: string;
  releaseYear: number;
  platforms: Platform[];
}

export interface UserGame {
  userId: string;
  gameId: string;
  status: 'played' | 'wantToPlay' | 'abandoned' | 'currentlyPlaying';
  ratingScore?: number;
  ratingConfidence?: number;
  comparisonCount: number;
  addedAt: string;
}

export interface Comparison {
  id: string;
  userId: string;
  winnerId: string;
  loserId: string;
  createdAt: string;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}
