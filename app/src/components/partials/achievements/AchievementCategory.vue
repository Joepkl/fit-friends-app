<template>
  <section>
    <div class="bg-light-grey rounded-default p-4">
      <h2 class="mb-3">{{ title }}</h2>
      <!-- Preview -->
      <ul class="flex justify-between">
        <li v-for="achievement in splitAchievements(achievements)" :key="achievement.id">
          <AchievementStack :achievement="achievement" />
        </li>
      </ul>
      <!-- All achievements -->
      <ul v-if="allAchievementsToggled">
        <li v-for="achievement in splitAchievements(achievements, true)" :key="achievement.id">
          <AchievementStack :achievement="achievement" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref } from "vue";

/** Placeholders */
import { AchievementLevels } from "@/constants/placeholders/AchievementLevels";

/** Constants */
import type { Achievements } from "@/constants/Achievements";

/** Components */
import AchievementStack from "@/components/partials/achievements/AchievementStack.vue";

const router = useRouter();
const allAchievementsToggled = ref(false);

defineProps<{
  title: string;
  achievements: Achievements;
}>();

const emits = defineEmits(["updateSelectedMeetupTab"]);

function splitAchievements(achievements: Achievements, renderAll: boolean = false) {
  let returnAchievements = [];
  const keys = Object.keys(achievements);
  // Render first 3 achievements
  if (!renderAll) {
    for (let i = 0; i < 3; i++) {
      returnAchievements.push(achievements[i]);
    }
    // Render the rest of the achievements
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
