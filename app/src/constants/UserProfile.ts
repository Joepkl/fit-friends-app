import type AccountSettings from '@/constants/AccountSettings';
import type Achievement from "@/constants/Achievement"

export default interface UserProfile {
  _id: string;
  username: string;
  password: string;
  email: string;
  settings: null | AccountSettings;
  showcaseAchievements: Array<Achievement | null>;
    personalGoals: Array<Achievement | null>;
  __v: number;
}
