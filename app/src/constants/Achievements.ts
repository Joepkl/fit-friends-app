export const MonthlyAchievements = Object.freeze({
  0: {
    title: "Consistency",
    description: "Met the personal frequency goal for 1 week, 2 weeks, and 4 weeks.",
    id: 1,
  },
  1: {
    title: "Competitor",
    description: "Achieved 10, 20, 50 points in the leaderboard competition.",
    id: 2,
  },
  2: {
    title: "Gym Rat",
    description: "Visited the gym 5, 10, 20 times this month.",
    id: 3,
  },
  3: {
    title: "Achiever",
    description: "Accomplished 1, 2, 3 achievements this month.",
    id: 4,
  },
  4: {
    title: "Cross Trainer",
    description: "Achieved achievements from different muscle groups: 2, 3, 5.",
    id: 5,
  },
  5: {
    title: "Social Life",
    description: "Commented on 2, 5, 10 posts this month.",
    id: 6,
  },
});

export const ChestAchievements = Object.freeze({
  0: {
    title: "Cable flies",
    description: "Exercise description",
    id: 7,
  },
  1: {
    title: "Machine flies",
    description: "Exercise description",
    id: 8,
  },
  2: {
    title: "Dumbbell press",
    description: "Exercise description",
    id: 9,
  },
  3: {
    title: "Incline dumbbell press",
    description: "Exercise description",
    id: 10,
  },
  4: {
    title: "Bench press",
    description: "Exercise description",
  },
  5: {
    title: "Incline bench press",
    description: "Exercise description",
    id: 11,
  },
});

export const LegAchievements = Object.freeze({
  0: {
    title: "Squats",
    description: "Exercise description",
    id: 12,
  },
  1: {
    title: "Deadlift",
    description: "Exercise description",
    id: 13,
  },
  2: {
    title: "Lunges",
    description: "Exercise description",
    id: 14,
  },
  3: {
    title: "Hack squat",
    description: "Exercise description",
    id: 15,
  },
  4: {
    title: "Leg extension",
    description: "Exercise description",
    id: 16,
  },
  5: {
    title: "Calf raises",
    description: "Exercise description",
    id: 17,
  },
});

export const BackAchievements = Object.freeze({
  0: {
    title: "Barbell row",
    description: "Exercise description",
    id: 18,
  },
  1: {
    title: "Dumbbell row",
    description: "Exercise description",
    id: 19,
  },
  2: {
    title: "Lat pulldown",
    description: "Exercise description",
    id: 20,
  },
  3: {
    title: "Low row",
    description: "Exercise description",
    id: 21,
  },
  4: {
    title: "Face pulls",
    description: "Exercise description",
    id: 22,
  },
  5: {
    title: "Reverse flies",
    description: "Exercise description",
    id: 23,
  },
});

export const ShoulderAchievements = Object.freeze({
  0: {
    title: "Shoulder press",
    description: "Exercise description",
    id: 24,
  },
  1: {
    title: "Overhead press",
    description: "Exercise description",
    id: 25,
  },
  2: {
    title: "Lateral raises",
    description: "Exercise description",
    id: 25,
  },
  3: {
    title: "Front raises",
    description: "Exercise description",
    id: 25,
  },
  4: {
    title: "Trap raises",
    description: "Exercise description",
    id: 26,
  },
  5: {
    title: "High pulls",
    description: "Exercise description",
    id: 27,
  },
});

export const BicepAchievements = Object.freeze({
  0: {
    title: "Bicep curl",
    description: "Exercise description",
    id: 28,
  },
  1: {
    title: "Hammer curl",
    description: "Exercise description",
    id: 29,
  },
  2: {
    title: "Preacher curl",
    description: "Exercise description",
    id: 30,
  },
});

export const TricepAchievements = Object.freeze({
  0: {
    title: "Skull crushers",
    description: "Exercise description",
    id: 31,
  },
  1: {
    title: "Overhead tricep extension",
    description: "Exercise description",
    id: 32,
  },
  2: {
    title: "Tricep push down",
    description: "Exercise description",
    id: 33,
  },
});

interface MonthlyAchievements {
  [key: number]: {
    title: string;
    description: string;
  };
}

export const AllAchievements = [
  MonthlyAchievements as MonthlyAchievements,
  ChestAchievements as MonthlyAchievements,
  LegAchievements as MonthlyAchievements,
  BackAchievements as MonthlyAchievements,
  ShoulderAchievements as MonthlyAchievements,
  BicepAchievements as MonthlyAchievements,
  TricepAchievements as MonthlyAchievements,
];
