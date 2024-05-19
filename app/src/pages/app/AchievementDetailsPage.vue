<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-8">Achievement details</h1>
    <!-- Back button -->
    <CButton @click="goBack" :image="BackIcon" class="w-6 h-6 mb-6" />
    <!-- Achievement content -->
    <section v-if="achievementInfo" class="bg-light-grey p-4 rounded-default">
      <h2 class="mb-6">{{ achievementInfo.title }}</h2>
      <p>{{ achievementInfo.description }}</p>
      <!-- Levels -->
      <ul class="mt-4">
        <li v-for="(item, index) in achievementInfo.levels" :key="index" class="flex gap-2">
          <p>{{ item.level }}</p>
          <p class="text-green">{{ item.points }} points</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Constants */
import { AllAchievements } from "@/constants/Achievements";

/** Routes */
import { ACHIEVEMENTS_ROUTE } from "@/router/appRoutes";

/** Images */
import BackIcon from "@/assets/icons/ic_back.svg";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import CButton from "@/components/ui/CButton.vue";

const router = useRouter();

const currentAchievementId = computed(() => parseInt(router.currentRoute.value.params.id as string));

const achievementInfo = getAchievementInfo(currentAchievementId.value);

function getAchievementInfo(id: number) {
  for (const category in AllAchievements) {
    for (const achievement in AllAchievements[category]) {
      if (AllAchievements[category][achievement].id === id) {
        return AllAchievements[category][achievement];
      }
    }
  }
}

function goBack() {
  router.push(ACHIEVEMENTS_ROUTE);
}
</script>
