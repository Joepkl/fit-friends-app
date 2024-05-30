import type AccountSettings from '@/constants/AccountSettings';
import type SingleAchievement from "@/constants/SingleAchievement";

export default interface UserProfile {
  _id?: string;
  username: string;
  password: string;
  email: string;
  settings: null | AccountSettings;
  showcaseAchievements: Array<SingleAchievement | null>;
  personalGoals: Array<SingleAchievement | null>;
  weeklyFrequency: number;
  weeklyConsistencyStreak: number;
  status: number;
  points?: number;
  __v?: number;
}
