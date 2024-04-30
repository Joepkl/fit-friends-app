<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default">
    <h2>Personal goals</h2>
    <ul class="flex flex-col gap-4 mt-4">
      <li v-for="(goal, index) in personalGoals" :key="index" class="flex items-center">
        <a @click="goToGoal" class="border-2 block border-white rounded-default p-4">
          <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
        </a>
        <p class="ml-4">No goals set.</p>
      </li>

      <li v-for="(goal, index) in personalGoals" :key="index" class="flex items-center">
        <a @click="goToAchievements" class="border-2 block border-white rounded-default p-4">
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

console.log(props.personalGoals)

const router = useRouter();

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}

function goToGoal() {
  console.log("Navigate to selected goal")
}
</script>
