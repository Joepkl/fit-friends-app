/** Vue */
import { defineStore } from 'pinia';

/** Constants */
import type UserProfile from '@/constants/UserProfile';
import type SingleAchievement from "@/constants/SingleAchievement";
import type PostContent from "@/constants/PostContent";
import Posts from "@/constants/placeholders/Posts";
import { getAchievementLevels } from "@/constants/placeholders/AchievementLevels";
import type { AchievementLevel } from "@/constants/placeholders/AchievementLevels";

export const useStore = defineStore('store', {
  state: () => {
    return {
      activeApiCalls: 0 as number,
      isLoading: null as null | boolean,
      isAuthenticated: null as null | boolean,
      userProfile: null as null | UserProfile,
      accessToken: null as null | string,
      isSearchExpanded: false as false | boolean,
      selectedAchievements: [] as SingleAchievement[],
      posts: Posts as PostContent[],
      userAchievementLevels: getAchievementLevels() as AchievementLevel[],
      createPostInput : {
        author: '',
        date: '',
        time: '',
        description: '',
        proudOf: [],
        achievements: [],
        likes: 0,
        comments: [],
        status: 0,
        isLikedByMe: false,
      } as PostContent,
    };
  },
  persist: true,
  getters: {
    getActiveApiCalls(): null | number {
      return this.activeApiCalls;
    },
    getIsLoading(): null | boolean {
      return this.isLoading;
    },
    getIsAuthenticated(): null | boolean {
      return this.isAuthenticated;
    },
    getAccessToken(): null | string {
      return this.accessToken;
    },
    getUserProfile(): null | UserProfile {
      return this.userProfile;
    },
    getIsSearchExpanded(): boolean {
      return this.isSearchExpanded;
    },
    getPosts(): PostContent[] {
      return this.posts;
    },
    getCreatePostInput(): PostContent {
      return this.createPostInput;
    },
    getUserAchievementLevels(): AchievementLevel[] {
      return this.userAchievementLevels;
    }
  },
  actions: {
    increaseActiveApiCalls() {
      this.activeApiCalls++;
    },
    decreaseActiveApiCalls() {
      this.activeApiCalls--;
    },
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
    setIsAuthenticated(value: boolean) {
      this.isAuthenticated = value;
    },
    setAccessToken(value: string) {
      this.accessToken = value;
    },
    setUserProfile(userProfile: UserProfile) {
      this.userProfile = userProfile;
    },
    setIsSearchExpanded(value: boolean) {
      this.isSearchExpanded = value;
    },
    setPosts(value: PostContent[]) {
      this.posts = value;
    },
    setCreatePostInput(value: PostContent) {
      this.createPostInput = value;
    },
    setSelectedAchievements(value: SingleAchievement[]) {
      this.createPostInput.achievements = value;
    },
    setUserAchievementLevels(value: AchievementLevel[]) {
      this.userAchievementLevels = value;
    }
  },
});
