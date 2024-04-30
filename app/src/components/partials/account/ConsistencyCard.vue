<template>
  <section class="bg-light-grey mt-6 p-4 rounded-default">
    <h2>Consistency</h2>
    <p class="mt-2">{{ formattedDate }}</p>
    <ul class="flex gap-4 mt-4">
      <li
        v-for="(day, index) in weeklyGoal"
        :key="index"
        class="h-8 rounded-default border-2 border-green"
        :class="getWeeklyGoalClass()"
      ></li>
    </ul>
    <div class="flex justify-between mt-4">
      <p>0/{{ weeklyGoal }} weekly goal</p>
      <p class="text-bronze">0 week streak</p>
    </div>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";

/** Constants */
import type UserProfile from '@/constants/UserProfile';

const props = defineProps<{
  weeklyGoal: number;
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

function getWeeklyGoalClass() {
  if (props.weeklyGoal === 1) {
    return "w-full";
  } else if (props.weeklyGoal === 2) {
    return "w-1/2";
  } else if (props.weeklyGoal === 3) {
    return "w-1/3";
  } else if (props.weeklyGoal === 4) {
    return "w-1/4";
  } else if (props.weeklyGoal === 5) {
    return "w-1/5";
  } else if (props.weeklyGoal === 6) {
    return "w-1/6";
  } else if (props.weeklyGoal === 7) {
    return "w-[14.3%]";
  }
}
</script>
