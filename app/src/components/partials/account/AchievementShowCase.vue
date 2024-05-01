<template>
  <ul class="flex justify-between mt-6">
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
      <a @click="goToAchievements" class="border-2 block border-white rounded-default p-5">
        <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-6 h-6" />
      </a>
    </li>
    <!-- Showcase achievements -->
    <li v-else v-for="(achievement, index) in achievements" :key="'else-' + index" class="flex w-[68px]">
      <a v-if="achievement" @click="goToAchievement(achievement.id as number)" class="block rounded-default">
        <img :src="getAchievementIcon(achievement.level)" class="w-[68px] h-[68px]" alt="Achievement icon" />
        <p class="mt-2">
          {{ AllAchievements[achievement.category][achievement.achievement].title }}
          {{ getAchievementLevel(achievement.level) }}
        </p>
      </a>
      <!-- No achievement selected -->
      <a v-else class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
    </li>
  </ul>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Routes */
import { ACHIEVEMENTS_ROUTE } from "@/router/appRoutes";

/** Constants */
import type Achievement from "@/constants/Achievement"
import { AllAchievements } from "@/constants/Achievements";

/** Images */
import DumbbellGoldIcon from "@/assets/icons/ic_dumbbell_gold.svg";
import DumbbellSilverIcon from "@/assets/icons/ic_dumbbell_silver.svg";
import DumbbellBronzeIcon from "@/assets/icons/ic_dumbbell_bronze.svg";

const props = defineProps<{
  achievements: Array<Achievement | null>;
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

function goToAchievement(achievementId: number) {
  console.log('Go to specific achievement' + achievementId)
}

function getAchievementIcon(level: number) {
  if(level === 1) {
    return DumbbellBronzeIcon;
  }
    if(level === 2) {
    return DumbbellSilverIcon;
  }
    if(level === 3) {
    return DumbbellGoldIcon;
  }
}

function getAchievementLevel(level:number) {
  if(level === 1) {
    return "I";
  }
  if(level === 2) {
    return "II";
  }
  if(level === 3) {
    return "  III";
  }
    if(level === 4) {
    return "  IV";
  }
    if(level === 5) {
    return "  V";
  }
    if(level === 6) {
    return "  VI";
  }
}
</script>
