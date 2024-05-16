<template>
  <div class="text-center">
    <img :src="getStackIcon(achievementLevel, achievement.maxLevel)" alt="" />
    <p>{{ achievement.title }}</p>
    <p>{{ achievementLevel }}/{{ achievement.maxLevel }}</p>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

/** Placeholders */
import { AchievementLevels } from "@/constants/placeholders/AchievementLevels";

/** Constants */
import type SingleAchievement from "@/constants/SingleAchievement";

/** Images */
import DumbbellStackGold from "@/assets/icons/ic_stack_dumbbell_gold.svg";
import DumbbellStackSilver from "@/assets/icons/ic_stack_dumbbell_silver.svg";
import DumbbellStackBronze from "@/assets/icons/ic_stack_dumbbell_bronze.svg";

const props = defineProps<{
  achievement: SingleAchievement;
}>();

const router = useRouter();
const allAchievementsToggled = ref(false);
const achievementLevel = getAchievementLevel(props.achievement.id);

function getStackIcon(level: number, maxLevel: number) {

}

console.log(props.achievement);


const emits = defineEmits(["updateSelectedMeetupTab"]);

function getAchievementLevel(id: number) {
  const achievement = AchievementLevels.find((achievement) => achievement.id === id);
  return achievement ? achievement.level : 1;
}
</script>
