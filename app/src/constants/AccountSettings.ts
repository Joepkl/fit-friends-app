import type { Gym } from "@/constants/placeholders/Gyms";

export default interface AccountSettings {
  username: string;
  age?: number | null;
  bio?: string | null;
  weeklyGoal: number;
  currentGym: Gym | null;
  shareData: boolean;
}
