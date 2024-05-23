<template>
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
        @click="selectGym(myGym as string)"
        class="border-2 rounded-default pl-[10px] py-1 bg-dark-grey z-50"
        :class="{
          'text-green border-green': selectedGym === myGym,
          'border-light-grey border-b-0': selectedGym !== myGym,
        }"
      >
        {{ myGym }}
      </li>
      <li
        @click="selectGym(userToInviteGym as string)"
        class="border-2 rounded-default pl-[10px] py-1 bg-dark-grey z-50"
        :class="{
          'text-green border-green': selectedGym === userToInviteGym,
          'border-light-grey border-t-0': selectedGym !== userToInviteGym,
        }"
      >
        {{ userToInviteGym }}
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
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

const props = defineProps<{
  selectedGymTab: number;
  selectedUser: string;
}>();

const emits = defineEmits(["closeInviteModal", "sendInvite"]);
const store = useStore();

const myGym = computed(() => store.getUserProfile?.settings?.currentGym?.name);

const selectedGym = ref(myGym.value);
const userToInviteGym = ref("");
const isInviteValid = ref(false);
const isGymDropdownActive = ref(false);
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
const currentDay = now
  .getDate()
  .toString()
  .padStart(2, "0");
const time = ref(
  `${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`
);
const date = ref(`${currentYear}-${currentMonth}-${currentDay}`);
const dateError = ref("");
const timeError = ref("");
const isDateValid = ref(true);
const isTimeValid = ref(true);

function findUserGym() {
  const gym = Users.find((user) => user.username === props.selectedUser)?.settings?.currentGym;
  if (gym) {
    userToInviteGym.value = gym.name;
  }
}

function closeInviteModal() {
  emits("closeInviteModal");
}

function sendInvite() {
  emits("sendInvite", selectedGym.value, date.value, time.value);
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
  const currentTime = `${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  if (date.value === `${currentYear}-${currentMonth}-${currentDay}` && time.value < currentTime) {
    isTimeValid.value = false;
    timeError.value = "Not possible to select a time in the past.";
  } else {
    isTimeValid.value = true;
  }
}

checkInviteValid();
function checkInviteValid() {
  checkDateValid();
  checkTimeValid();
  if (isDateValid.value && isTimeValid.value) {
    isInviteValid.value = true;
  } else {
    isInviteValid.value = false;
  }
}

function selectGym(gym: string) {
  selectedGym.value = gym;
  isGymDropdownActive.value = false;
}

function openGymDropdown() {
  isGymDropdownActive.value = true;
}

findUserGym();
</script>
