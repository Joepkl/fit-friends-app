<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default relative">
    <h2 class="text-green">Consistency</h2>
    <CButton v-if="isLoggedInAccount" @click="toggleEdit" :image="EditIcon" class="absolute right-4 top-4 w-6 h-6" />
    <p class="mt-2">{{ formattedDate }}</p>
    <ul class="flex gap-4 mt-4">
      <li
        v-for="(day, index) in weeklyGoal"
        :key="index"
        class="h-8 rounded-default border-2 border-green"
        :class="getWeeklyGoalClass(index)"
      ></li>
    </ul>
    <div class="flex justify-between mt-4 flex-wrap gap-2">
      <p>{{ weeklyFrequency }}/{{ weeklyGoal }} weekly goal</p>
      <p :class="getColorClass(status, true)">{{ consistencyStreak }} week streak</p>
    </div>
  </section>
</template>

<script setup lang="ts">
/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

/** Images */
import EditIcon from "@/assets/icons/ic_edit.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Helpers */
import { getWeekNumber } from "@/helpers/dateHelpers";

const props = defineProps<{
  weeklyGoal: number;
  weeklyFrequency: number;
  consistencyStreak: number;
  status: number;
  isLoggedInAccount: boolean;
}>();

const emits = defineEmits(["toggleEdit"]);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();
const formattedDate = `${months[date.getMonth()]} ${date.getFullYear()} - week ${getWeekNumber(date)}`;

function toggleEdit() {
  emits("toggleEdit");
}

function getWeeklyGoalClass(index: number) {
  const fillClass = index < props.weeklyFrequency ? "bg-green" : "bg-light-grey";
  let widthClass;
  if (props.weeklyGoal === 1) {
    widthClass = "w-full";
  } else if (props.weeklyGoal === 2) {
    widthClass = "w-1/2";
  } else if (props.weeklyGoal === 3) {
    widthClass = "w-1/3";
  } else if (props.weeklyGoal === 4) {
    widthClass = "w-1/4";
  } else if (props.weeklyGoal === 5) {
    widthClass = "w-1/5";
  } else if (props.weeklyGoal === 6) {
    widthClass = "w-1/6";
  } else if (props.weeklyGoal === 7) {
    widthClass = "w-[14.3%]";
  }
  return `${fillClass} ${widthClass}`;
}
</script>
