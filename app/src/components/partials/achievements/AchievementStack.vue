<template>
  <button @click="goToAchievement(achievement.id)" class="flex flex-col w-full items-center text-center">
    <img
      :src="getStackIcon(achievementLevel, achievement.maxLevel as number, achievement.category)"
      alt="Achievement stack"
      class="w-[68px] h-[68px]"
    />
    <p>{{ achievement.title }}</p>
    <p>{{ achievementLevel }}/{{ achievement.maxLevel }}</p>
  </button>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

/** Placeholders */
import { AchievementLevels } from "@/constants/placeholders/AchievementLevels";

/** Constants */
import type SingleAchievement from "@/constants/SingleAchievement";

/** Routes */
import { ACHIEVEMENT_DETAILS_ROUTE } from "@/router/appRoutes";

/** Images */
import DumbbellStackGoldIcon from "@/assets/icons/ic_stack_dumbbell_gold.svg";
import DumbbellStackSilverIcon from "@/assets/icons/ic_stack_dumbbell_silver.svg";
import DumbbellStackBronzeIcon from "@/assets/icons/ic_stack_dumbbell_bronze.svg";
import DumbbellStackDisabledIcon from "@/assets/icons/ic_stack_dumbbell_disabled.svg";
import TimeStackGoldIcon from "@/assets/icons/ic_stack_time_gold.svg";
import TimeStackSilverIcon from "@/assets/icons/ic_stack_time_silver.svg";
import TimeStackBronzeIcon from "@/assets/icons/ic_stack_time_bronze.svg";
import TimeStackDisabledIcon from "@/assets/icons/ic_stack_time_disabled.svg";

const props = defineProps<{
  achievement: SingleAchievement;
}>();

const emits = defineEmits(["updateSelectedMeetupTab"]);

const router = useRouter();
const achievementLevel = getAchievementUserLevel(props.achievement.id);

function getStackIcon(level: number, maxLevel: number, category: number) {
  const levelPercentage = (level / maxLevel) * 100;

  // Monthly stack icon
  if(category === 0) {
    if (levelPercentage < 1) {
      return TimeStackDisabledIcon;
    } else if (levelPercentage < 34) {
      return TimeStackBronzeIcon;
    } else if (levelPercentage < 67) {
      return TimeStackSilverIcon;
    } else {
      return TimeStackGoldIcon;
    }
  }
  // Dumbbell stack icon
  else {
    if (levelPercentage < 1) {
      return DumbbellStackDisabledIcon;
    } else if (levelPercentage < 34) {
      return DumbbellStackBronzeIcon;
    } else if (levelPercentage < 67) {
      return DumbbellStackSilverIcon;
    } else {
      return DumbbellStackGoldIcon;
    }
  }
}

function getAchievementUserLevel(id: number) {
  const achievement = AchievementLevels.find((achievement) => achievement.id === id);
  return achievement ? achievement.level : 1;
}

function goToAchievement(id: number) {
  router.push({ name: ACHIEVEMENT_DETAILS_ROUTE.name, params: { id: id } });
}
</script>
