<template>
  <ul class="flex justify-between mt-6">
    <li v-for="(achievement, index) in achievements" :key="index">
      <a @click="goToAchievements" class="border-2 block border-white rounded-default p-5">
        <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-6 h-6" />
      </a>
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

defineProps<{
  achievements: Array<Achievement | null>;
}>();

const router = useRouter();

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}
</script>
