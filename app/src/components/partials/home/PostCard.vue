<template>
  <section @click="handleClick" class="bg-light-grey rounded-default p-4">
    <div class="flex">
      <!-- Username and profile picture -->
      <a class="flex items-center gap-2">
        <div class="block w-8 h-auto rounded-full border-2 overflow-hidden" :class="getColorClass(null, true)">
          <img class="p-1 relative top-[5px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
        </div>
        <h2 class="text-[18px] font-medium" :class="getColorClass(true)">{{ content.author }}</h2>
      </a>
      <!-- Date -->
      <ul class="text-right leading-4 ml-auto relative top-2 text-green">
        <li>{{ content.date }}</li>
        <li>{{ content.time }}</li>
      </ul>
    </div>
    <!-- Description -->
    <p v-if="content.description" class="mt-4">{{ content.description }}</p>
    <!-- Proud of in this workout -->
    <div v-if="content.proudOf?.length" class="mt-4">
      <p class="text-green">Proud of in this workout:</p>
      <ul class="list-disc pl-4 leading-5">
        <li v-for="(item, index) in content.proudOf" :key="index">{{ item }}</li>
      </ul>
    </div>
    <!-- Achievements -->
    <div v-if="content.achievements?.length" class="mt-4">
      <p class="text-green">Accomplished achievements</p>
      <ul>
        <li v-for="(item, index) in content.achievements" :key="index" class="flex items-center mt-2">
          <img :src="getAchievementIcon(item.level)" class="w-12" alt="Achievement icon" />
          <p class="ml-2">
            {{ AllAchievements[item.category][item.achievement].title }}{{ getAchievementLevel(item.level) }}
          </p>
        </li>
      </ul>
    </div>
    <!-- TODO Likes -->
    <!-- TODO Comments -->
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import DumbbellGoldIcon from "@/assets/icons/ic_dumbbell_gold.svg";
import DumbbellSilverIcon from "@/assets/icons/ic_dumbbell_silver.svg";
import DumbbellBronzeIcon from "@/assets/icons/ic_dumbbell_bronze.svg";

/** Constants */
import type PostContent from "@/constants/PostContent";
import { AllAchievements } from "@/constants/Achievements";

const emits = defineEmits(["click"]);

const props = defineProps<{
  content: PostContent;
}>();

const statusColors = ["bronze", "silver", "gold"];

function handleClick(): void {
  emits("click");
}

function getAchievementIcon(level: number) {
  if(level === 1) {
    return DumbbellBronzeIcon;
  }
    if(level === 2) {
    return DumbbellSilverIcon;
  }
    if(level === 3) {
    return DumbbellGoldIcon;
  }
}

function getAchievementLevel(level:number) {
  if(level === 1) {
    return "I";
  }
  if(level === 2) {
    return "II";
  }
  if(level === 3) {
    return "  III";
  }
    if(level === 4) {
    return "  IV";
  }
    if(level === 5) {
    return "  V";
  }
    if(level === 6) {
    return "  VI";
  }
}

function getColorClass(isText: boolean | null = null, isBorder: boolean | null = null, isBackground: boolean | null = null) {
  let prefix;
  if(isText) {
    prefix = "text-";
  } else if(isBorder) {
    prefix = "border-";
  } else if(isBackground) {
    prefix = "bg-";
  }
  return prefix + statusColors[props.content.status];
}
</script>
