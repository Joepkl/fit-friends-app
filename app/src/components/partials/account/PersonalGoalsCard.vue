<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default">
    <h2 class="text-green">Personal goals</h2>
    <ul class="flex flex-col gap-4 mt-4">
      <!-- No goals selected and logged in account-->
      <li v-if="!hasGoals && isLoggedInAccount" class="flex items-center">
        <a @click="goToAchievements" class="border-2 block border-white rounded-default p-4">
          <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
        </a>
        <p class="ml-4">No goals set.</p>
      </li>
      <!-- No goals and not logged in account -->
      <li v-else-if="!hasGoals && !isLoggedInAccount" class="flex items-center">
        <a class="border-2 block border-white rounded-default w-[56px] h-[56px]"></a>
        <p class="ml-4">This user has set no goals yet.</p>
      </li>
      <!-- Showcase selected goals -->
      <li v-else v-for="(goal, index) in personalGoals" :key="index" class="flex items-center">
        <div v-if="goal" class="flex items-center">
          <a @click="goToGoal(goal as Achievement)" class="block rounded-default">
            <img
              :src="getAchievementIcon(goal.level, goal.category)"
              class="w-[56px] h-[56px]"
              alt="Achievement icon"
            />
          </a>
          <p class="ml-4">
            {{ AllAchievements[goal.category][goal.achievement].title }}
            {{ getAchievementLevel(goal.level) }}
          </p>
        </div>
        <!-- No goal selected -->
        <div v-else class="flex items-center">
          <a class="border-2 block border-white rounded-default w-[56px] h-[56px]"> </a>
          <p class="ml-4">No goal set.</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Routes */
import { ACHIEVEMENTS_ROUTE } from "@/router/appRoutes";

/** Constants */
import type Achievement from "@/constants/Achievement"
import { AllAchievements } from "@/constants/Achievements";

/** Helpers */
import { getAchievementIcon, getAchievementLevel } from "@/helpers/achievementHelpers";

const props = defineProps<{
  personalGoals: Array<Achievement | null>;
  isLoggedInAccount: boolean;
}>();

const hasGoals = hasUserGoals();

function hasUserGoals() {
  for (const goal of props.personalGoals) {
    if (goal) {
      return true;
    }
  }
  return false;
}

const router = useRouter();

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}

function goToGoal(goal: Achievement) {
  // Navigate to selected goal
  console.log(goal)
}
</script>
