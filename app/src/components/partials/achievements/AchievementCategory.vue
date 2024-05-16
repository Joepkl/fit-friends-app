<template>
  <section>
    <div class="bg-light-grey rounded-default p-4">
      <h2 class="mb-6">{{ title }}</h2>
      <!-- Preview -->
      <ul class="flex justify-between gap-x-2 gap-y-3 flex-wrap">
        <li v-for="(achievement, index) in displayedAchievements" :key="index" class="w-[30%] min-w-[90px]">
          <AchievementStack :achievement="achievement" />
        </li>
      </ul>
    </div>
    <CButton @click="toggleAchievements" :text="buttonText" button-class="link" class="w-fit ml-auto mt-1" />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, onMounted, onUnmounted } from 'vue';

/** Constants */
import type { Achievements } from '@/constants/Achievements';

/** Components */
import AchievementStack from '@/components/partials/achievements/AchievementStack.vue';

/** Components */
import CButton from "@/components/ui/CButton.vue";

const isAchievementsToggled = ref(false);
const buttonText = ref("View all")
const displayedAchievements = ref({});

const props = defineProps<{
  title: string;
  achievements: Achievements;
}>();

function setDisplayedAchievements() {
  if(isAchievementsToggled.value) {
    displayedAchievements.value = props.achievements;
  } else {
    const screenWidth = window.innerWidth;
    const count = screenWidth > 380 ? 3 : 2;
    displayedAchievements.value = Object.values(props.achievements).slice(0, count);
  }
}

function toggleAchievements() {
  isAchievementsToggled.value = !isAchievementsToggled.value;
  buttonText.value = isAchievementsToggled.value ? "View less" : "View all";
  setDisplayedAchievements();
}

setDisplayedAchievements();

onMounted(() => {
  window.addEventListener('resize', setDisplayedAchievements);
});

onUnmounted(() => {
  window.removeEventListener('resize', setDisplayedAchievements);
});
</script>
