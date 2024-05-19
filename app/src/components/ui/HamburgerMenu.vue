<template>
  <!-- Hamburger menu -->
  <button @click="toggleMenu" class="hamburger-menu w-[30px] h-[20px] relative z-30" :class="{ open: isMenuOpen }">
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-0" />
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-2" />
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-2" />
    <span class="block absolute h-[4px] w-full bg-green rounded-[9px] opacity-100 left-0 top-4" />
  </button>
  <!-- Menu items -->
  <ul
    class="menu-items fixed right-0 w-0 bg-light-grey top-0 pt-[85px] z-20 h-[100dvh] flex flex-col gap-8 overflow-hidden"
    :class="{ 'open w-60': isMenuOpen }"
  >
    <li
      v-for="(item, index) in menuItems"
      :key="index"
      class="font-semibold whitespace-nowrap hover:text-green"
      :class="{
        'bg-green text-light-grey hover:text-light-grey':
          currentRoute === item.name || parentRouteWithActiveChild === item.name,
      }"
    >
      <a @click="goTo(item.link)" class="flex items-center gap-4 pl-8 pr-default py-2">
        <img :src="getIcon(item)" class="h-5 w-5" alt="Icon" />
        {{ item.name }}
      </a>
    </li>
  </ul>
  <!-- Overlay -->
  <div
    @touchstart.passive="toggleMenu"
    class="fixed h-[100dvh] inset-0 z-10"
    :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
  />
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Images */
import AchievementsIcon from "@/assets/icons/ic_achievements.svg";
import AchievementsGreyIcon from "@/assets/icons/ic_achievements_grey.svg";
import HomeIcon from "@/assets/icons/ic_home.svg";
import HomeGreyIcon from "@/assets/icons/ic_home_grey.svg";
import FriendsIcon from "@/assets/icons/ic_friends.svg";
import FriendsGreyIcon from "@/assets/icons/ic_friends_grey.svg";
import LeaderboardIcon from "@/assets/icons/ic_leaderboard.svg";
import LeaderboardGreyIcon from "@/assets/icons/ic_leaderboard_grey.svg";
import AddIcon from "@/assets/icons/ic_add.svg";
import AddGreyIcon from "@/assets/icons/ic_add_grey.svg";
import CalendarIcon from "@/assets/icons/ic_calendar.svg";
import CalendarGreyIcon from "@/assets/icons/ic_calendar_grey.svg";

/** Types */
import type MenuItem from '@/constants/MenuItem';
import type Route from '@/constants/Route';

/** Routes */
import {
  HOME_ROUTE,
  FRIENDS_ROUTE,
  MEETUP_ROUTE,
  ACHIEVEMENTS_ROUTE,
  LEADERBOARD_ROUTE,
  CREATE_POST_ROUTE,
} from "@/router/appRoutes";

const isMenuOpen = ref(false);
const parentRouteWithActiveChild = ref("");
const menuItems = ref([
  { name: "Home", link: HOME_ROUTE, icon: HomeIcon, activeIcon: HomeGreyIcon },
  { name: "Friends", link: FRIENDS_ROUTE, icon: FriendsIcon, activeIcon: FriendsGreyIcon },
  { name: "Meetup", link: MEETUP_ROUTE, icon: CalendarIcon, activeIcon: CalendarGreyIcon },
  { name: "Achievements", link: ACHIEVEMENTS_ROUTE, icon: AchievementsIcon, activeIcon: AchievementsGreyIcon },
  { name: "Leaderboard", link: LEADERBOARD_ROUTE, icon: LeaderboardIcon, activeIcon: LeaderboardGreyIcon },
  { name: "Create post", link: CREATE_POST_ROUTE, icon: AddIcon, activeIcon: AddGreyIcon },
]);

const router = useRouter();
const currentRoute = computed(() => router.currentRoute.value.matched[0].name);

function getIcon(item: MenuItem) {
  // Check if child route is active
  if(item.link.children) {
    for(let i = 0; i < item.link.children.length; i++) {
      if(item.link.children[i].name === currentRoute.value) {
        parentRouteWithActiveChild.value = item.link.name;
        return item.activeIcon;
      }
    }
  }
  // Check if route is active
  if(currentRoute.value === item.name) {
    return item.activeIcon;
  } else {
    return item.icon;
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function goTo(route: Route) {
  router.push(route);
  isMenuOpen.value = false;
}
</script>

<style scoped>
.hamburger-menu {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}

.hamburger-menu span {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.hamburger-menu.open span:nth-child(1) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.hamburger-menu.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.hamburger-menu.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.hamburger-menu.open span:nth-child(4) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.menu-items {
  -webkit-transition: 0.2s ease-in-out;
  -moz-transition: 0.2s ease-in-out;
  -o-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
}

.menu-items.open {
  -webkit-transition: 0.4s ease-in-out;
  -moz-transition: 0.4s ease-in-out;
  -o-transition: 0.4s ease-in-out;
  transition: 0.4s ease-in-out;
}
</style>
