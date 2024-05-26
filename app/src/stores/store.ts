import { defineStore } from 'pinia';
import type UserProfile from '@/constants/UserProfile';
import type SingleAchievement from "@/constants/SingleAchievement";
import type PostContent from "@/constants/PostContent";
import Posts from "@/constants/placeholders/Posts";

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
      posts:  Posts as PostContent[],
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
    getIsSearchExpanded():boolean {
      return this.isSearchExpanded;
    },
    getSelectedAchievements(): SingleAchievement[] {
      return this.selectedAchievements;
    },
    getPosts(): PostContent[] {
      return this.posts;
    }
  },
  actions: {
    increaseActiveApiCalls() {
      this.activeApiCalls ++;
    },
    decreaseActiveApiCalls() {
      this.activeApiCalls --;
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
    setSelectedAchievements(value: SingleAchievement[]) {
      this.selectedAchievements = value;
    },
    setPosts(value: PostContent[]) {
      this.posts = value;
    },
  },
});

