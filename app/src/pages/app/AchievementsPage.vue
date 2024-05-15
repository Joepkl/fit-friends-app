<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-4">Achievements</h1>
    <section>
      <h2>Monthly</h2>
      <ul>
        <!-- Preview -->
        <li v-for="achievement in splitAchievements(MonthlyAchievements)" :key="achievement.id">
          <div class="text-center">
            <p>{{ achievement.title }}</p>
            <p>{{ getAchievementLevel(achievement.id) }}/{{ achievement.maxLevel }}</p>
          </div>
        </li>
        <!-- All achievements -->
        <li v-for="achievement in splitAchievements(MonthlyAchievements, true)" :key="achievement.id">
          <div class="text-center">
            <p>{{ achievement.title }}</p>
            <p>{{ getAchievementLevel(achievement.id) }}/{{ achievement.maxLevel }}</p>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Placeholders */
import { AchievementLevels } from "@/constants/placeholders/AchievementLevels";

/** Constants */
import type { Achievements } from "@/constants/Achievements";

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

function splitAchievements(achievements: Achievements, renderAll: boolean = false) {
  let returnAchievements = [];
  const keys = Object.keys(achievements);
  if(!renderAll) {
    for (let i = 0; i < 3; i++) {
      returnAchievements.push(achievements[i]);
    }
  } else {
    for (let i = 3; i < keys.length; i++) {
      returnAchievements.push(achievements[i]);
    }
  }
  return returnAchievements;
}

function getAchievementLevel(id: number) {
  const achievement = AchievementLevels.find((achievement) => achievement.id === id);
  return achievement ? achievement.level : 1;
}
</script>
