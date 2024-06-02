<template>
  <section>
    <div class="flex items-center mb-2 justify-between">
      <h2 class="text-green">Calendar</h2>
      <!-- Week navigation -->
      <div class="flex gap-3 font-bold text-green items-center">
        <button @click="previousWeek">&lt;</button>
        <p class="font-semibold relative top-[2px]">Week {{ selectedWeek }}</p>
        <button @click="nextWeek">></button>
      </div>
    </div>
    <!-- Week days -->
    <ul class="flex justify-between bg-light-grey rounded-default p-4 gap-2 flex-wrap">
      <li v-for="(day, index) in days" :key="index" class="flex flex-col items-center gap-1">
        <p
          :class="{
            'text-green underline underline-offset-4': currentDay === day && currentWeek === selectedWeek,
          }"
        >
          {{ day }}
        </p>
        <!-- Render bullets for meetups this day -->
        <div
          v-for="(meetup, position) in getMeetups(index)"
          :key="position"
          class="bg-green w-[10px] h-[10px] rounded-full mt-1"
        ></div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

/** Constants */
import type Meetup from "@/constants/Meetup";

/** Helpers */
import { getWeekNumber, getWeekStartAndEndDate } from "@/helpers/dateHelpers";

const props = defineProps<{
  meetups: Array<Meetup>;
}>();

const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const now = new Date();
const currentDayIndex = getDayIndexStartMonday(now);
const currentDay = days[currentDayIndex];
const currentWeek = getWeekNumber(now);

const selectedWeek = ref(currentWeek);

function getDayIndexStartMonday(date: Date) {
  return (date.getDay() + 6) % 7;
}

function getMeetups(dayIndex: number) {
  let meetupsThisDay = [];
  // Loop through meetups and check if they are this day
  for(const meetup of props.meetups) {
    const splitDate = meetup.date.split("-");
    // Need this format for Safari
    const dateObject = new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
    const meetupWeek = getWeekNumber(dateObject);

    if(meetupWeek === selectedWeek.value && getDayIndexStartMonday(dateObject) === dayIndex) {
      meetupsThisDay.push(meetup);
    }
  }
  return meetupsThisDay;
}

function previousWeek() {
  selectedWeek.value -= 1;
}

function nextWeek() {
  selectedWeek.value += 1;
}
</script>
