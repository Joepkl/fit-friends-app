export default interface SingleAchievement {
  title?: string;
  description?: string;
  maxLevel?: number;
  category: number;
  id: number;
  level?: number;
  levels?: {
    [key: number]: {
      level: string;
      points: number;
    };
  };
}
