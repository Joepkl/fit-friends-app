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
        <button
          v-for="(meetup, position) in getMeetups(index)"
          @click="openMeetup(meetup)"
          :key="position"
          class="bg-green w-[10px] h-[10px] rounded-full mt-1"
        />
      </li>
    </ul>
    <!-- Meetup modal -->
    <CModal :isActive="isMeetupModalActive" @close-modal="toggleMeetupModal" :content="MeetupInformation">
      <!-- Users -->
      <ul class="mt-4">
        <li v-for="(user, index) in nonNullSelectedMeetup.users" :key="index" class="mt-1">
          <button @click="goToProfile(user.username)" class="flex items-center gap-[6px]">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(user.status, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(user.status, true)">{{ user.username }}</p>
          </button>
        </li>
      </ul>
      <!-- Meetup info -->
      <div class="mt-4">
        <p><span class="text-green">Date: </span>{{ nonNullSelectedMeetup.date }}</p>
        <p class="mt-1"><span class="text-green">Time: </span>{{ nonNullSelectedMeetup.time }}</p>
        <p class="mt-1"><span class="text-green">Location: </span>{{ nonNullSelectedMeetup.gym }}</p>
      </div>
      <div class="mt-6 flex flex-wrap gap-4 ml-auto w-fit">
        <!-- Cancel meetup -->
        <CButton
          @click="openCancelMeetupModal()"
          text="Cancel meetup"
          button-class="outline"
          :isDisabled="!nonNullSelectedMeetup.isJoining"
        />
        <!-- Join meetup -->
        <CButton @click="joinMeetup" text="Join" button-class="primary" :isDisabled="nonNullSelectedMeetup.isJoining" />
      </div>
    </CModal>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Constants */
import type Meetup from "@/constants/Meetup";
import { MeetupInformation } from "@/constants/ModalContent";

/** Components */
import CModal from "@/components/ui/CModal.vue";

/** Routes */
import { USER_PROFILE_ROUTE, ACCOUNT_ROUTE } from "@/router/appRoutes";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Helpers */
import { getWeekNumber } from "@/helpers/dateHelpers";
import { getColorClass } from "@/helpers/userHelpers";


const props = defineProps<{
  meetups: Array<Meetup>;
}>();

const emits = defineEmits(["openCancelMeetupModal", "joinMeetup"]);
const store = useStore();

const now = new Date();
const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const currentDayIndex = getDayIndexStartMonday(now);
const currentDay = days[currentDayIndex];
const currentWeek = getWeekNumber(now);

const router = useRouter();
const selectedWeek = ref(currentWeek);
const isMeetupModalActive = ref(false);
const selectedMeetup = ref<Meetup | null>(null);

const nonNullSelectedMeetup = computed(() => selectedMeetup.value!);
const userProfile = computed(() => store.getUserProfile);

function getDayIndexStartMonday(date: Date) {
  return (date.getDay() + 6) % 7;
}

function toggleMeetupModal() {
  isMeetupModalActive.value = !isMeetupModalActive.value;
}

function openCancelMeetupModal() {
  toggleMeetupModal();
  emits("openCancelMeetupModal", selectedMeetup.value?.users[0].username, selectedMeetup.value?.id);
}

function goToProfile(username: string) {
  if(username === userProfile.value?.username) {
    router.push(ACCOUNT_ROUTE);
  } else {
    router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
  }
}

function joinMeetup() {
  emits("joinMeetup", selectedMeetup.value?.id);
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

function openMeetup(meetup: Meetup) {
  selectedMeetup.value = meetup;
  toggleMeetupModal();
}

function previousWeek() {
  selectedWeek.value -= 1;
}

function nextWeek() {
  selectedWeek.value += 1;
}
</script>
