<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-8">Achievements</h1>
    <div class="flex flex-col gap-6">
      <AchievementCategory title="Monthly" :achievements="MonthlyAchievements" />
      <AchievementCategory title="Chest" :achievements="ChestAchievements" />
      <AchievementCategory title="Legs" :achievements="LegAchievements" />
      <AchievementCategory title="Back" :achievements="BackAchievements" />
      <AchievementCategory title="Shoulders" :achievements="ShoulderAchievements" />
      <AchievementCategory title="Bicep" :achievements="BicepAchievements" />
      <AchievementCategory title="Tricep" :achievements="TricepAchievements" />
    </div>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import AchievementCategory from "@/components/partials/achievements/AchievementCategory.vue";

import {
  MonthlyAchievements,
  ChestAchievements,
  LegAchievements,
  BackAchievements,
  ShoulderAchievements,
  BicepAchievements,
  TricepAchievements,
} from "@/constants/Achievements";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";

const store = useStore();
const router = useRouter();

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
