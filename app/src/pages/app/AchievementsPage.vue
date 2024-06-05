<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-8">Achievements</h1>
    <div class="flex flex-col gap-10">
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

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
