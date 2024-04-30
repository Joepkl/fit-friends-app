<template>
  <ul class="flex justify-between mt-6">
    <!-- Has no achievements selected for showcase -->
    <li v-if="!hasAchievements() && !isLoggedInAccount">
      <a class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
    </li>
    <li v-if="!hasAchievements() && !isLoggedInAccount">
      <a class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
    </li>
    <li v-if="!hasAchievements() && !isLoggedInAccount">
      <a class="border-2 w-[68px] h-[68px] block border-white rounded-default p-5"></a>
    </li>
    <!-- Showcase achievements -->
    <li v-else v-for="(achievement, index) in achievements" :key="index">
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

const props = defineProps<{
  achievements: Array<Achievement | null>;
  isLoggedInAccount: boolean;
}>();

const router = useRouter();

function hasAchievements() {
  props.achievements.forEach(achievement => {
    if(achievement) {
      return true;
    }
  })
  return false;
}

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}
</script>
