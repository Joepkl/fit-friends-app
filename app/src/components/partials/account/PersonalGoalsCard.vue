<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default">
    <h2>Personal goals</h2>
    <ul class="flex flex-col gap-4 mt-4">
      <!-- No goals selected -->
      <li v-if="!hasGoals()" class="flex items-center">
        <a @click="goToAchievements" class="border-2 block border-white rounded-default p-4">
          <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
        </a>
        <p class="ml-4">No goals set.</p>
      </li>
      <!-- Showcase selected goals -->
      <li v-else v-for="(goal, index) in personalGoals" :key="index" class="flex items-center">
        <a @click="goToGoal(goal as Achievement)" class="border-2 block border-white rounded-default p-4">
          <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
        </a>
        <p class="ml-4">No goals set.</p>
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

const props = defineProps<{
  personalGoals: Array<Achievement | null>;
}>();

function hasGoals() {
  props.personalGoals.forEach(goal => {
    if(goal) {
      return true;
    }
  })
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
