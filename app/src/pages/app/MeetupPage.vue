<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-2">Meetup</h1>
    <p class="mb-10">
      Invite your friends to join you on your gym adventures! Working together helps in staying motivated and reaching
      your goals.
    </p>

    <!-- My meetups -->
    <h2 class="text-green mb-2">My meetups</h2>
    <div class="flex mb-4">
      <button
        @click="selectedMeetupTab = 0"
        :class="{ 'bg-green text-dark-grey': selectedMeetupTab === 0, 'text-green': selectedMeetupTab !== 0 }"
        class="border-2 border-green rounded-bl-default rounded-tl-default font-semibold px-2 py-1"
      >
        Meetups
      </button>
      <button
        @click="selectedMeetupTab = 1"
        :class="{ 'bg-green text-dark-grey': selectedMeetupTab === 1, 'text-green': selectedMeetupTab !== 1 }"
        class="border-2 border-green border-l-0 font-semibold px-2 py-1"
      >
        Invites
      </button>
      <button
        @click="selectedMeetupTab = 2"
        :class="{ 'bg-green text-dark-grey': selectedMeetupTab === 2, 'text-green': selectedMeetupTab !== 2 }"
        class="border-2 border-green border-l-0 rounded-br-default rounded-tr-default font-semibold px-2 py-1"
      >
        Invited by me
      </button>
    </div>

    <!-- Meetups -->
    <section v-if="selectedMeetupTab === 0">
      <ul v-if="meetups.length">
        <li v-for="(item, index) in meetups" :key="index" class="bg-light-grey rounded-default p-3 relative">
          <button class="flex items-center gap-[6px]">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(item.userStatus, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(item.userStatus, true)">{{ item.username }}</p>
          </button>
          <!-- Details meetup -->
          <div class="mt-3">
            <p><span class="text-green">Date: </span>{{ item.date }}</p>
            <p class="mt-1"><span class="text-green">Time: </span>{{ item.time }}</p>
            <p class="mt-1"><span class="text-green">Location: </span>{{ item.gym }}</p>
          </div>
          <!-- Remove meetup button -->
          <CButton
            @click="openCancelMeetupModal(item.username, item.id)"
            :image="CloseIcon"
            class="w-4 h-4 absolute top-3 right-3"
          />
        </li>
      </ul>
      <p v-else>No meetups planned yet.</p>
    </section>

    <!-- Invites -->
    <section v-if="selectedMeetupTab === 1">
      <ul v-if="invites.length" class="flex flex-col gap-2">
        <li v-for="(item, index) in invites" :key="index" class="bg-light-grey rounded-default p-3 relative">
          <button class="flex items-center gap-[6px]">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(item.userStatus, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(item.userStatus, true)">{{ item.username }}</p>
          </button>
          <!-- Details meetup -->
          <div class="mt-3">
            <p><span class="text-green">Date: </span>{{ item.date }}</p>
            <p class="mt-1"><span class="text-green">Time: </span>{{ item.time }}</p>
            <p class="mt-1"><span class="text-green">Location: </span>{{ item.gym }}</p>
          </div>
          <!-- Remove meetup button -->
          <CButton
            @click="openCancelInviteModal(item.username, item.id)"
            :image="CloseIcon"
            class="w-4 h-4 absolute top-3 right-3"
          />
        </li>
      </ul>
      <p v-else>You have no open invites at the moment.</p>
    </section>

    <!-- Invites sent by me-->
    <section v-if="selectedMeetupTab === 2">
      <ul v-if="myInvites.length" class="flex flex-col gap-2">
        <li v-for="(item, index) in myInvites" :key="index" class="bg-light-grey rounded-default p-3 relative">
          <button class="flex items-center gap-[6px]">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(item.userStatus, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(item.userStatus, true)">{{ item.username }}</p>
          </button>
          <!-- Details meetup -->
          <div class="mt-3">
            <p><span class="text-green">Date: </span>{{ item.date }}</p>
            <p class="mt-1"><span class="text-green">Time: </span>{{ item.time }}</p>
            <p class="mt-1"><span class="text-green">Location: </span>{{ item.gym }}</p>
          </div>
          <!-- Remove meetup button -->
          <CButton
            @click="openCancelInviteModal(item.username, item.id)"
            :image="CloseIcon"
            class="w-4 h-4 absolute top-3 right-3"
          />
        </li>
      </ul>
      <p v-else>No invites sent by you are open at the moment.</p>
    </section>

    <!-- Send invite -->
    <h2 class="text-green mb-2 mt-10">Send invite</h2>
    <div class="flex mb-4">
      <button
        @click="selectedGymTab = 0"
        :class="{ 'bg-green text-dark-grey': selectedGymTab === 0, 'text-green': selectedGymTab !== 0 }"
        class="border-2 border-green rounded-bl-default rounded-tl-default font-semibold px-2 py-1"
      >
        My gym
      </button>
      <button
        @click="selectedGymTab = 1"
        :class="{ 'bg-green text-dark-grey': selectedGymTab === 1, 'text-green': selectedGymTab !== 1 }"
        class="border-2 border-green border-l-0 rounded-br-default rounded-tr-default font-semibold px-2 py-1"
      >
        Other gym
      </button>
    </div>

    <!-- Invite user from my gym -->
    <section v-if="selectedGymTab === 0">
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
    <section v-if="selectedGymTab === 1" class="mt-4">
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
      Send a meetup invite to go to
      <span class="text-green">{{ selectedGym }}</span>
      together with
      <span class="text-green">{{ selectedUser }}</span
      >?
    </p>
    <!-- Select gym -->
    <div v-if="selectedGymTab === 1" class="flex flex-col mb-4 relative">
      <label for="gym">Select gym</label>
      <input @click="openGymDropdown" v-model="selectedGym" id="gym" type="text" readonly />
      <ul v-if="isGymDropdownActive" class="absolute bottom-[-70px] w-full">
        <li
          @click="selectGym(myGym)"
          class="border-2 rounded-default pl-[10px] py-1 bg-dark-grey z-50"
          :class="{
            'text-green border-green': myGym === selectedGym,
            'border-light-grey border-b-0': myGym !== selectedGym,
          }"
        >
          {{ myGym }}
        </li>
        <li
          @click="selectGym('Fit for Free Spaklerweg')"
          class="border-2 rounded-default pl-[10px] py-1 bg-dark-grey z-50"
          :class="{
            'text-green border-green': selectedGym === 'Fit for Free Spaklerweg',
            'border-light-grey border-t-0': selectedGym !== 'Fit for Free Spaklerweg',
          }"
        >
          Fit for Free Spaklerweg
        </li>
      </ul>
    </div>
    <!-- Select day -->
    <div class="flex flex-col">
      <label for="time">Select date</label>
      <input v-model="date" @change="checkInviteValid" :class="{ error: dateError }" type="date" id="time" />
    </div>
    <!-- Select time -->
    <div class="flex flex-col mt-4">
      <label for="time">Select time</label>
      <input v-model="time" @change="checkInviteValid" :class="{ error: timeError }" type="time" id="time" />
    </div>
    <!-- Error -->
    <p v-if="dateError" class="error mt-2">{{ dateError }}</p>
    <p v-if="timeError" class="error mt-2">{{ timeError }}</p>
    <!-- Buttons -->
    <div class="mt-8 flex justify-end">
      <CButton @click="closeInviteModal" button-class="outline" text="Cancel" class="mr-6" />
      <CButton @click="sendInvite" button-class="primary" text="Send invite" :is-disabled="!isInviteValid" />
    </div>
  </CModal>

  <!-- Cancel meetup modal -->
  <CModal
    @close-modal="closeCancelMeetupModal"
    :isActive="isCancelMeetupModalActive"
    :content="CancelMeetupContent"
    :hide-close-button="true"
  >
    <p>
      Are you sure you want to cancel this meetup with <span class="text-green">{{ selectedUser }}</span
      >?
    </p>
    <!-- Buttons -->
    <div class="mt-8 flex justify-end">
      <CButton @click="closeCancelMeetupModal" button-class="outline" text="Don't cancel" class="mr-6" />
      <CButton @click="cancelMeetup" button-class="primary" text="Cancel" />
    </div>
  </CModal>

  <!-- Cancel invite modal -->
  <CModal
    @close-modal="closeCancelInviteModal"
    :isActive="isCancelInviteModalActive"
    :content="CancelInviteContent"
    :hide-close-button="true"
  >
    <p>
      Are you sure you want to cancel this invite to <span class="text-green">{{ selectedUser }}</span
      >?
    </p>
    <!-- Buttons -->
    <div class="mt-8 flex justify-end">
      <CButton @click="closeCancelInviteModal" button-class="outline" text="Don't cancel" class="mr-6" />
      <CButton @click="cancelInvite" button-class="primary" text="Cancel" />
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
import CloseIcon from "@/assets/icons/ic_close_green.svg";

/** Constants */
import { MeetupContent, CancelMeetupContent, CancelInviteContent } from "@/constants/ModalContent";
import type Meetup from "@/constants/Meetup";

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

const selectedMeetupTab = ref(0);getUserStatus
const isGymDropdownActive = ref(false);
const myGym = ref("SportCity Amstelveen");
const selectedGym = ref(myGym.value);
const selectedGymTab = ref(0);
const isInviteModalActive = ref(false);
const selectedUser = ref("");
const isInviteValid = ref(false);
const time = ref(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
const date = ref(`${currentYear}-${currentMonth}-${currentDay}`);
const dateError = ref("");
const timeError = ref("");
const isDateValid = ref(true);
const isTimeValid = ref(true);
const isCancelMeetupModalActive = ref(false);
const isCancelInviteModalActive = ref(false);
const selectedMeetupId = ref<number | null>(null);
const selectedInviteId = ref<number | null>(null);

const meetups = ref<Array<Meetup>>([
  {
    id: 1,
    username: "sammy_02",
    gym: "SportCity Amstelveen",
    date: "2024-05-09",
    time: "12:00",
    userStatus: getUserStatus("sammy_02") || 1,
  },
]);

const invites = ref<Array<Meetup>>([]);
const myInvites = ref<Array<Meetup>>([]);

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

function checkTimeValid() {
  timeError.value = "";
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  if(date.value === `${currentYear}-${currentMonth}-${currentDay}` && time.value < currentTime) {
    isTimeValid.value = false;
    timeError.value = "Not possible to select a time in the past.";
  } else {
    isTimeValid.value = true;
  }
}

function openGymDropdown() {
  isGymDropdownActive.value = true;
}

function checkInviteValid() {
  checkDateValid();
  checkTimeValid();
  if (isDateValid.value && isTimeValid.value ) {
    isInviteValid.value = true;
  } else {
    isInviteValid.value = false;
  }
}

function selectGym(gym: string) {
  selectedGym.value = gym;
  isGymDropdownActive.value = false;
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

function closeCancelMeetupModal() {
  isCancelMeetupModalActive.value = false;
  console.log('frires')
}

function openCancelMeetupModal(username: string, meetupId: number) {
  isCancelMeetupModalActive.value = true;
  selectedUser.value = username;
  selectedMeetupId.value = meetupId;
}

function closeCancelInviteModal() {
  isCancelInviteModalActive.value = false;
}

function cancelMeetup() {
  // Make API request here
  isCancelMeetupModalActive.value = false;
  meetups.value = meetups.value.filter((meetup) => meetup.id !== selectedMeetupId.value);
}

function cancelInvite() {
  // Make API request here
  isCancelInviteModalActive.value = false;
  myInvites.value = myInvites.value.filter((invite) => invite.id !== selectedInviteId.value);
}

function showInviteModal(username: string) {
  checkInviteValid();
  isInviteModalActive.value = true;
  selectedUser.value = username;
}

function closeInviteModal() {
  isInviteModalActive.value = false;
}

function openCancelInviteModal(username: string, inviteId: number) {
  isCancelInviteModalActive.value = true;
  selectedUser.value = username;
  selectedInviteId.value = inviteId
}

function resetValues() {
  selectedUser.value = "";
  selectedGym.value = myGym.value;
  date.value = `${currentYear}-${currentMonth}-${currentDay}`;
  time.value = `${now.getHours()}:${now.getMinutes()}`;
  isInviteValid.value = false;
}

function compareMeetups(a: Meetup, b: Meetup) {
  const dateA = new Date(`${a.date}T${a.time}`);
  const dateB = new Date(`${b.date}T${b.time}`);
  return dateA.getTime() - dateB.getTime();
}

function getUserStatus(username: string) {
  const user = Users.find((item) => item.username === username);
  return user?.status;
}

function sendInvite() {
  // Make API request here
  isInviteModalActive.value = false;

  myInvites.value.push({
    id: myInvites.value.length + 1,
    username: selectedUser.value,
    gym: selectedGym.value,
    date: date.value,
    time: time.value,
    userStatus: getUserStatus(selectedUser.value) || 1,
  });
  myInvites.value.sort(compareMeetups);
  resetValues();
}
</script>
