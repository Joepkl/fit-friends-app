<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-2">Meetup</h1>
    <p class="mb-10">
      Invite your friends to join you on your gym adventures! Working together helps in staying motivated and reaching
      your goals.
    </p>
    <!-- Send invite -->
    <h2 class="text-green mb-2">Send invite</h2>
    <div class="flex mb-4">
      <button
        @click="selectedTab = 0"
        :class="{ 'bg-green text-dark-grey': selectedTab === 0 }"
        class="border-2 border-green text-green rounded-bl-default rounded-tl-default font-semibold px-2 py-1"
      >
        My gym
      </button>
      <button
        @click="selectedTab = 1"
        :class="{ 'bg-green text-dark-grey': selectedTab === 1 }"
        class="border-2 border-green text-green border-l-0 rounded-br-default rounded-tr-default font-semibold px-2 py-1"
      >
        Other gym
      </button>
    </div>
    <!-- Invite user from my gym -->
    <section v-if="selectedTab === 0">
      <ul>
        <li v-for="(user, index) in Users" :key="index" class="bg-light-grey mt-3 p-3 flex rounded-default">
          <button @click="goToProfile(user.username)" class="flex items-center gap-[6px]">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(user.status, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(user.status, true)">{{ user.username }}</p>
          </button>
          <!-- Remove friend button -->
          <CButton @click="showInviteModal(user.username)" text="Invite" button-class="link" class="ml-auto" />
        </li>
      </ul>
    </section>
    <!-- Invite user from other gym -->
    <section v-if="selectedTab === 1" class="mt-4">
      <SearchUsers @clicked-user="showInviteModal" label-text="Invite a friend" />
    </section>
  </section>
  <!-- Invite modal -->
  <CModal
    @close-modal="closeInviteModal"
    :isActive="isInviteModalActive"
    :content="MeetupContent"
    :hide-close-button="true"
  >
    <p class="mb-4">
      Send a meetup invite to go to the gym together to <span class="text-green">{{ selectedUser }}</span
      >?
    </p>
    <!-- Select day -->
    <div class="flex flex-col">
      <label for="time">Select date</label>
      <input v-model="date" @change="checkInviteValid" :class="{ error: dateError }" type="date" id="time" />
    </div>
    <!-- Select time -->
    <div class="flex flex-col mt-4">
      <label for="time">Select time</label>
      <input v-model="time" @change="checkInviteValid" type="time" id="time" />
    </div>
    <!-- Error -->
    <p v-if="dateError" class="error mt-2">{{ dateError }}</p>
    <!-- Buttons -->
    <div class="mt-8 flex justify-end">
      <CButton @click="closeInviteModal" button-class="outline" text="Cancel" class="mr-6" />
      <CButton @click="sendInvite" button-class="primary" text="Send invite" :is-disabled="!isInviteValid" />
    </div>
  </CModal>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";

/** Constants */
import { MeetupContent } from "@/constants/ModalContent";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import CButton from "@/components/ui/CButton.vue";
import SearchUsers from "@/components/partials/friends/SearchUsers.vue";
import CModal from "@/components/ui/CModal.vue";

const store = useStore();
const router = useRouter();
const statusColors = ["bronze", "silver", "gold"];

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
const currentDay = now
  .getDate()
  .toString()
  .padStart(2, "0");

const selectedTab = ref(0);
const isInviteModalActive = ref(false);
const selectedUser = ref("");
const isInviteValid = ref(false);
const time = ref("");
const date = ref(`${currentYear}-${currentMonth}-${currentDay}`);
const dateError = ref("");
const isDateValid = ref(true);

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}

function checkDateValid() {
  dateError.value = "";
  const selectedDate = new Date(date.value);
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedDay = selectedDate.getDate();
  // Check if date is in the past
  if (selectedYear < currentYear) {
    dateError.value = "Not possible to select a year in the past.";
    isDateValid.value = false;
  } else if (selectedMonth < parseInt(currentMonth) && selectedYear === currentYear) {
    dateError.value = "Not possible to select a month in the past.";
    isDateValid.value = false;
  } else if (selectedDay < parseInt(currentDay) && selectedYear === currentYear) {
    dateError.value = "Not possible to select a day in the past.";
    isDateValid.value = false;
  } else {
    isDateValid.value = true;
  }
}

function checkInviteValid() {
  checkDateValid();
  if (isDateValid.value && time.value) {
    isInviteValid.value = true;
  } else {
    isInviteValid.value = false;
  }
}

function getColorClass(
  status: number,
  isText: boolean | null = null,
  isBorder: boolean | null = null,
  isBackground: boolean | null = null
) {
  let prefix;
  if (isText) {
    prefix = "text-";
  } else if (isBorder) {
    prefix = "border-";
  } else if (isBackground) {
    prefix = "bg-";
  }
  return prefix + statusColors[status];
}

function showInviteModal(username: string) {
  isInviteModalActive.value = true;
  selectedUser.value = username;
}

function closeInviteModal() {
  isInviteModalActive.value = false;
}

function sendInvite() {
  // Make API request here
  isInviteModalActive.value = false;
}
</script>
