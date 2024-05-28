<template>
  <section class="bg-light-grey p-4 rounded-default">
    <h2 class="text-green mb-4">Showcase</h2>
    <ul class="flex justify-between text-center">
      <!-- Has no achievements selected for showcase -->
      <li v-if="!hasAchievements && !isLoggedInAccount">
        <a class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
      </li>
      <li v-if="!hasAchievements && !isLoggedInAccount">
        <a class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
      </li>
      <li v-if="!hasAchievements && !isLoggedInAccount">
        <a class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
      </li>
      <!-- Has no achievements logged in account -->
      <li v-else-if="!hasAchievements && isLoggedInAccount" v-for="(achievement, index) in achievements" :key="index">
        <a @click="goToAchievements" class="border-2 block border-white rounded-default p-4">
          <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
        </a>
      </li>
      <!-- Showcase achievements -->
      <li v-else v-for="(achievement, index) in achievements" :key="'else-' + index" class="flex w-[68px]">
        <a v-if="achievement" @click="goToAchievement(achievement.id as number)" class="block rounded-default">
          <img
            :src="getAchievementIconFromPercentage(achievement.level as number, achievement.maxLevel as number, achievement.category)"
            class="w-[56px] h-[56px] mx-auto"
            alt="Achievement icon"
          />
          <p class="mt-2">
            {{ getAchievementInfo(achievement.id as number)?.title }}
            {{ getAchievementLevel(achievement.level as number) }}
          </p>
        </a>
        <!-- No achievement selected -->
        <a v-else class="border-2 w-[56px] h-[56px] block border-white rounded-default p-5"></a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Routes */
import { ACHIEVEMENTS_ROUTE, ACHIEVEMENT_DETAILS_ROUTE } from "@/router/appRoutes";

/** Constants */
import type SingleAchievement from "@/constants/SingleAchievement";

/** Helpers */
import { getAchievementIconFromPercentage, getAchievementLevel, getAchievementInfo } from "@/helpers/achievementHelpers";

const props = defineProps<{
  achievements: Array<SingleAchievement | null>;
  isLoggedInAccount: boolean;
}>();

const router = useRouter();
const hasAchievements = hasUserAchievements();

function hasUserAchievements() {
  for (const achievement of props.achievements) {
    if (achievement) {
      return true;
    }
  }
  return false;
}

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}

function goToAchievement(id: number) {
  router.push({ name: ACHIEVEMENT_DETAILS_ROUTE.name, params: { id: id } });
}
</script>
