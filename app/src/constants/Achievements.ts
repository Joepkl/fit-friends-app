import type SingleAchievement from "@/constants/SingleAchievement";

export const MonthlyAchievements = Object.freeze({
  0: {
    title: "Consistency",
    description: "Met the personal frequency goal for 1 week, 2 weeks, and 4 weeks.",
    maxLevel: 3,
    category: 0,
    id: 1,
  },
  1: {
    title: "Competitor",
    description: "Achieved 10, 20, 50 points in the leaderboard competition.",
    maxLevel: 3,
    category: 0,
    id: 2,
  },
  2: {
    title: "Gym Rat",
    description: "Visited the gym 5, 10, 20 times this month.",
    maxLevel: 3,
    category: 0,
    id: 3,
  },
  3: {
    title: "Achiever",
    description: "Accomplished 1, 2, 3 achievements this month.",
    maxLevel: 3,
    category: 0,
    id: 4,
  },
  4: {
    title: "Cross Trainer",
    description: "Achieved achievements from different muscle groups: 2, 3, 5.",
    maxLevel: 3,
    category: 0,
    id: 5,
  },
  5: {
    title: "Social Life",
    description: "Commented on 2, 5, 10 posts this month.",
    maxLevel: 3,
    category: 0,
    id: 6,
  },
});

export const ChestAchievements = Object.freeze({
  0: {
    title: "Cable flies",
    description: "Exercise description",
    maxLevel: 6,
    category: 1,
    id: 7,
  },
  1: {
    title: "Machine flies",
    description: "Exercise description",
    maxLevel: 6,
    category: 1,
    id: 8,
  },
  2: {
    title: "Dumbbell press",
    description: "Exercise description",
    maxLevel: 6,
    category: 1,
    id: 9,
  },
  3: {
    title: "Incline dumbbell press",
    description: "Exercise description",
    maxLevel: 6,
    category: 1,
    id: 10,
  },
  4: {
    title: "Bench press",
    description: "Exercise description",
    maxLevel: 6,
    category: 1,
    id: 11,
  },
  5: {
    title: "Incline bench press",
    description: "Exercise description",
    maxLevel: 6,
    category: 1,
    id: 12,
  },
});

export const LegAchievements = Object.freeze({
  0: {
    title: "Squats",
    description: "Exercise description",
    maxLevel: 6,
    category: 2,
    id: 13,
  },
  1: {
    title: "Deadlift",
    description: "Exercise description",
    maxLevel: 6,
    category: 2,
    id: 14,
  },
  2: {
    title: "Lunges",
    description: "Exercise description",
    maxLevel: 6,
    category: 2,
    id: 15,
  },
  3: {
    title: "Hack squat",
    description: "Exercise description",
    maxLevel: 6,
    category: 2,
    id: 16,
  },
  4: {
    title: "Leg extension",
    description: "Exercise description",
    maxLevel: 6,
    category: 2,
    id: 17,
  },
  5: {
    title: "Calf raises",
    description: "Exercise description",
    maxLevel: 6,
    category: 2,
    id: 18,
  },
});

export const BackAchievements = Object.freeze({
  0: {
    title: "Barbell row",
    description: "Exercise description",
    maxLevel: 6,
    category: 3,
    id: 19,
  },
  1: {
    title: "Dumbbell row",
    description: "Exercise description",
    maxLevel: 6,
    category: 3,
    id: 20,
  },
  2: {
    title: "Lat pulldown",
    description: "Exercise description",
    maxLevel: 6,
    category: 3,
    id: 21,
  },
  3: {
    title: "Low row",
    description: "Exercise description",
    maxLevel: 6,
    category: 3,
    id: 22,
  },
  4: {
    title: "Face pulls",
    description: "Exercise description",
    maxLevel: 6,
    category: 3,
    id: 23,
  },
  5: {
    title: "Reverse flies",
    description: "Exercise description",
    maxLevel: 6,
    category: 3,
    id: 24,
  },
});

export const ShoulderAchievements = Object.freeze({
  0: {
    title: "Shoulder press",
    description: "Exercise description",
    maxLevel: 6,
    category: 4,
    id: 25,
  },
  1: {
    title: "Overhead press",
    description: "Exercise description",
    maxLevel: 6,
    category: 4,
    id: 26,
  },
  2: {
    title: "Lateral raises",
    description: "Exercise description",
    maxLevel: 6,
    category: 4,
    id: 27,
  },
  3: {
    title: "Front raises",
    description: "Exercise description",
    maxLevel: 6,
    category: 4,
    id: 28,
  },
  4: {
    title: "Trap raises",
    description: "Exercise description",
    maxLevel: 6,
    category: 4,
    id: 29,
  },
  5: {
    title: "High pulls",
    description: "Exercise description",
    maxLevel: 5,
    category: 4,
    id: 30,
  },
});

export const BicepAchievements = Object.freeze({
  0: {
    title: "Bicep curl",
    description: "Exercise description",
    maxLevel: 3,
    category: 5,
    id: 31,
  },
  1: {
    title: "Hammer curl",
    description: "Exercise description",
    maxLevel: 3,
    category: 5,
    id: 32,
  },
  2: {
    title: "Preacher curl",
    description: "Exercise description",
    maxLevel: 3,
    category: 5,
    id: 33,
  },
});

export const TricepAchievements = Object.freeze({
  0: {
    title: "Skull crushers",
    description: "Exercise description",
    maxLevel: 3,
    category: 6,
    id: 34,
  },
  1: {
    title: "Overhead tricep extension",
    description: "Exercise description",
    maxLevel: 3,
    category: 6,
    id: 35,
  },
  2: {
    title: "Tricep push down",
    description: "Exercise description",
    maxLevel: 3,
    category: 6,
    id: 36,
  },
});

export type Achievements = { [key: number]: SingleAchievement };

export const AllAchievements = [
  MonthlyAchievements as Achievements,
  ChestAchievements as Achievements,
  LegAchievements as Achievements,
  BackAchievements as Achievements,
  ShoulderAchievements as Achievements,
  BicepAchievements as Achievements,
  TricepAchievements as Achievements,
];
