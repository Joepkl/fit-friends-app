<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default">
    <h2 class="text-green">Consistency</h2>
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

const props = defineProps<{
  weeklyGoal: number;
  weeklyFrequency: number;
  consistencyStreak: number;
  status: number;
}>();

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

function getWeekNumber(date: Date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  // Get first day of year
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(((Number(date) - Number(yearStart)) / 86400000 + 1) / 7);
  return weekNumber;
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
