const HomePage = () => import("@/pages/app/HomePage.vue");
const Friendspage = () => import("@/pages/app/FriendsPage.vue");
const MeetupPage = () => import("@/pages/app/MeetupPage.vue");
const AchievementsPage = () => import("@/pages/app/AchievementsPage.vue");
const LeaderboardPage = () => import("@/pages/app/LeaderboardPage.vue");
const CreatePostPage = () => import("@/pages/app/CreatePostPage.vue");
const AccountSettingsPage = () => import("@/pages/app/AccountSettingsPage.vue");
const UserProfilePage = () => import("@/pages/app/UserProfilePage.vue");

const HOME_ROUTE = {
  path: "/home",
  name: "Home",
  component: HomePage,
  meta: {
    requiresAuth: true,
    pageTitle: "Home",
  },
};

const FRIENDS_ROUTE = {
  path: "/friends",
  name: "Friends",
  component: Friendspage,
  meta: {
    requiresAuth: true,
    pageTitle: "Friends",
  },
};

const MEETUP_ROUTE = {
  path: "/meetup",
  name: "Meetup",
  component: MeetupPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Meetup",
  },
};

const ACHIEVEMENTS_ROUTE = {
  path: "/achievements",
  name: "Achievements",
  component: AchievementsPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Achievements",
  },
};

const LEADERBOARD_ROUTE = {
  path: "/leaderboard",
  name: "Leaderboard",
  component: LeaderboardPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Leaderboard",
  },
};

const CREATE_POST_ROUTE = {
  path: "/create-post",
  name: "Create post",
  component: CreatePostPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Create post",
  },
};

const ACCOUNT_ROUTE = {
  path: "/account",
  name: "Account",
  component: AccountSettingsPage,
  meta: {
    requiresAuth: true,
    pageTitle: "Account",
  },
};

const USER_PROFILE_ROUTE = {
  path: "/user/:username",
  name: "User profile",
  component: UserProfilePage,
  meta: {
    requiresAuth: true,
    pageTitle: "User profile",
  },
};

const appRoutes = [
  HOME_ROUTE,
  FRIENDS_ROUTE,
  MEETUP_ROUTE,
  ACHIEVEMENTS_ROUTE,
  LEADERBOARD_ROUTE,
  CREATE_POST_ROUTE,
  ACCOUNT_ROUTE,
  USER_PROFILE_ROUTE,
];

export default appRoutes;
export {
  HOME_ROUTE,
  FRIENDS_ROUTE,
  MEETUP_ROUTE,
  ACHIEVEMENTS_ROUTE,
  LEADERBOARD_ROUTE,
  CREATE_POST_ROUTE,
  ACCOUNT_ROUTE,
  USER_PROFILE_ROUTE,
};
