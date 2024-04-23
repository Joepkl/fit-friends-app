export default interface AccountSettings {
  username: string;
  age?: number | null;
  bio?: string | null;
  weeklyGoal: number;
  shareData: boolean;
}
