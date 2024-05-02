import type UserProfile from "@/constants/UserProfile"

const Users: Array<UserProfile> = [
  {
    username: "Mike_330",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "Mike_330",
        age: 32,
        bio: "Hi there! My name is Mike and I'm a fitness enthusiast. I try to combine this with my work.",
        weeklyGoal: 4,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 1,
        achievement: 3,
        level: 3,
      },
      {
        category: 2,
        achievement: 3,
        level: 2,
      },
      {
        category: 4,
        achievement: 3,
        level: 2,
      },
    ],
    personalGoals: [
      {
        category: 2,
        achievement: 3,
        level: 3,
      },
      {
        category: 3,
        achievement: 3,
        level: 2,
      },
      null
    ],
    weeklyFrequency: 4,
    weeklyConsistencyStreak: 16,
    status: 2,
  },
    {
    username: "WilliamPT",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "WilliamPT",
        age: 28,
        bio: "I am a personal trainer. Like to use this app to keep up to date with my friends and clients.",
        weeklyGoal: 2,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 5,
        achievement: 2,
        level: 1,
      },
      {
        category: 0,
        achievement: 2,
        level: 3,
      },
      {
        category: 4,
        achievement: 5,
        level: 1,
      },
    ],
    personalGoals: [
      {
        category: 5,
        achievement: 2,
        level: 2,
      },
      {
        category: 4,
        achievement: 5,
        level: 2,
      },
      {
        category: 2,
        achievement: 5,
        level: 3,
      },
    ],
    weeklyFrequency: 1,
    weeklyConsistencyStreak: 6,
    status: 1,
  },
    {
    username: "Sarah.B",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "Sarah.B",
        age: 32,
        bio: "Hellooo! I'm Sarah and I love to stay fit. I'm always looking for new challenges.",
        weeklyGoal: 1,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 2,
        achievement: 2,
        level: 1,
      },
      null,
      null
    ],
    personalGoals: [
      {
        category: 2,
        achievement: 2,
        level: 2,
      },
      {
        category: 2,
        achievement: 4,
        level: 1,
      },
    ],
    weeklyConsistencyStreak: 3,
    weeklyFrequency: 1,
    status: 0,
  },
    {
    username: "BillyJones",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "BillyJones",
        age: 23,
        bio: "Hi there! I'm Billy and I'm a student at the HvA. I like to stay active and healthy.",
        weeklyGoal: 2,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 2,
        achievement: 2,
        level: 3,
      },
      {
        category: 3,
        achievement: 3,
        level: 3,
      },
      {
        category: 0,
        achievement: 5,
        level: 2,
      },
    ],
    personalGoals: [
      {
        category: 2,
        achievement: 3,
        level: 3,
      },
      {
        category: 2,
        achievement: 5,
        level: 2,
      },
      null
    ],
    weeklyFrequency: 1,
    weeklyConsistencyStreak: 22,
    status: 2,
  },
    {
    username: "sammy_02",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "sammy_02",
        age: 24,
        bio: "Mostly use this app to stay up to date with my friends and work towards my goal. Let's become friends!",
        weeklyGoal: 4,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 0,
        achievement: 5,
        level: 2,
      },
      {
        category: 0,
        achievement: 4,
        level: 1,
      },
      {
        category: 3,
        achievement: 4,
        level: 1,
      },
    ],
    personalGoals: [null, null, null],
    weeklyFrequency: 3,
    weeklyConsistencyStreak: 9,
    status: 1,
  },
    {
    username: "GregBlake",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "GregBlake",
        age: 31,
        bio: "Just started with this app. I'm looking for some friends to help me stay motivated.",
        weeklyGoal: 2,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 5,
        achievement: 2,
        level: 2,
      },
      null,
      null
    ],
    personalGoals: [null, null, null],
    weeklyFrequency: 1,
    weeklyConsistencyStreak: 1,
    status: 0,
  },
    {
    username: "jayJo.K",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "jayJo.K",
        age: 21,
        bio: "My name is Jay, trying to get to a streak of training each week for half a year.",
        weeklyGoal: 1,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 5,
        achievement: 1,
        level: 2,
      },
      {
        category: 1,
        achievement: 2,
        level: 1,
      },
      {
        category: 2,
        achievement: 2,
        level: 1,
      },
    ],
    personalGoals: [
      {
        category: 3,
        achievement: 4,
        level: 2,
      },
      {
        category: 5,
        achievement: 1,
        level: 3,
      },
      null
    ],
    weeklyFrequency: 1,
    weeklyConsistencyStreak: 12,
    status: 1,
  },
    {
    username: "mikeyB",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "mikeyB",
        age: 24,
        bio: "Have been using this app for a while. Let's become friends and stay motivated!",
        weeklyGoal: 3,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 1,
        achievement: 2,
        level: 3,
      },
      {
        category: 3,
        achievement: 1,
        level: 3,
      },
      {
        category: 1,
        achievement: 4,
        level: 2,
      },
    ],
    personalGoals: [
      {
        category: 1,
        achievement: 4,
        level: 3,
      },
      {
        category: 2,
        achievement: 4,
        level: 2,
      },
      {
        category: 0,
        achievement: 4,
        level: 3,
      },
    ],
    weeklyFrequency: 2,
    weeklyConsistencyStreak: 15,
    status: 2,
  },
  {
    username: "lianne_22",
    password: "password",
    email: "john.doe@gmail.com",
    settings: {
        username: "lianne_22",
        age: 24,
        bio: "Hi there! My name is Lianne and I like to go to the gym in my spare time. Try to combine this with my internship and work.",
        weeklyGoal: 3,
        shareData: true,
    },
    showcaseAchievements: [
      {
        category: 3,
        achievement: 1,
        level: 1,
      },
      {
        category: 2,
        achievement: 1,
        level: 2,
      },
      {
        category: 2,
        achievement: 3,
        level: 2,
      },
    ],
    personalGoals: [
      {
        category: 4,
        achievement: 1,
        level: 1,
      },
      {
        category: 2,
        achievement: 4,
        level: 2,
      },
      {
        category: 0,
        achievement: 0,
        level: 2,
      },
    ],
    weeklyFrequency: 2,
    weeklyConsistencyStreak: 7,
    status: 1,
  },
];

export default Users;