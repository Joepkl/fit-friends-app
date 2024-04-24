<template>
  <CHeader />
  <div class="page-wrapper-header">
    <!-- Account -->
    <section v-if="!isEditActive">
      <!-- Profile picture and username -->
      <button class="block w-full mx-auto max-w-24 h-auto rounded-full border-2 border-bronze overflow-hidden">
        <img class="p-3 relative top-4 left-[2px]" :src="AccountIcon" alt="Profile picture" />
      </button>
      <div class="flex mt-4 justify-center items-center">
        <div>
          <h1>
            @{{ userProfile?.username }}
            <span v-if="userProfile?.settings?.age" class="text-white font-medium">
              , {{ userProfile?.settings?.age }}
            </span>
          </h1>
        </div>
        <CButton @click="isEditActive = true" :image="EditIcon" class="relative left-5 w-6 h-6" />
      </div>
      <!-- Bio -->
      <p class="text-center mt-4">{{ userProfile?.settings?.bio }}</p>
      <!-- Showcase achievements -->
      <ul class="flex justify-between mt-6">
        <li>
          <a @click="goToAchievements" class="border-2 block border-white rounded-default p-5">
            <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-6 h-6" />
          </a>
        </li>
        <li>
          <a @click="goToAchievements" class="border-2 block border-white rounded-default p-5">
            <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-6 h-6" />
          </a>
        </li>
        <li>
          <a @click="goToAchievements" class="border-2 block border-white rounded-default p-5">
            <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-6 h-6" />
          </a>
        </li>
      </ul>
      <!-- Consistency -->
      <section class="bg-light-grey mt-6 p-4 rounded-default">
        <h2>Consistency</h2>
        <p class="mt-2">{{ formattedDate }}</p>
        <ul class="flex gap-4 mt-4">
          <li
            v-for="(day, index) in userProfile?.settings?.weeklyGoal"
            :key="index"
            class="h-8 rounded-default border-2 border-green"
            :class="getWeeklyGoalClass()"
          ></li>
        </ul>
        <div class="flex justify-between mt-4">
          <p>0/{{ userProfile?.settings?.weeklyGoal }} weekly goal</p>
          <p class="text-bronze">0 week streak</p>
        </div>
      </section>
      <!-- Personal goals -->
      <section class="bg-light-grey mt-6 p-4 rounded-default">
        <h2>Personal goals</h2>
        <ul class="flex flex-col gap-4 mt-4">
          <li class="flex items-center">
            <a @click="goToAchievements" class="border-2 block border-white rounded-default p-4">
              <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
            </a>
            <p class="ml-4">No goals set.</p>
          </li>
        </ul>
      </section>
    </section>
    <!-- Edit account -->
    <section v-if="isEditActive">
      <h1>Settings</h1>
      <!-- Inputs -->
      <form class="mt-8">
        <ul class="flex flex-col gap-4">
          <!-- Username -->
          <li class="flex flex-col">
            <label for="username">Username *</label>
            <input id="username" type="text" :value="userProfile?.username" disabled />
          </li>
          <!-- Age -->
          <li class="flex flex-col">
            <label for="age">Age</label>
            <input v-model="age" id="age" type="number" placeholder="25" />
          </li>
          <!-- Bio -->
          <li class="flex flex-col">
            <label for="bio">Bio</label>
            <input v-model="bio" id="bio" type="text" placeholder="Tell us something about you" />
          </li>
          <!-- Frequency weekly goal -->
          <li class="flex">
            <div class="w-[70%] flex flex-col">
              <label for="weekly-goal">Weekly fitness goal *</label>
              <input v-model="weeklyGoal" disabled id="weekly-goal" type="number" placeholder="2" />
            </div>
            <div class="flex gap-4 mt-4 justify-center ml-4">
              <button @click.prevent="decreaseWeeklyGoal" class="w-5">
                <img src="@/assets/icons/ic_minus.svg" alt="Minus icon" />
              </button>
              <button @click.prevent="increaseWeeklyGoal" class="w-5">
                <img src="@/assets/icons/ic_add.svg" alt="Plus icon" />
              </button>
            </div>
          </li>
          <!-- Share data with friends -->
          <li class="flex flex-col mt-2">
            <label class="container">
              Agree to share data with friends
              <input v-model="shareData" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <button @click.prevent="showDataModal" class="button-link w-fit ml-6">More info</button>
          </li>
        </ul>
      </form>
      <!-- Modal -->
      <CModal @close-modal="closeDataModal" :isActive="isDataModalActive" :content="ShareDataContent" />
      <!-- CTA -->
      <div class="flex justify-end mt-8">
        <CButton text="Cancel" button-class="outline" @click="isEditActive = false" class="mr-10" />
        <CButton text="Save" button-class="primary" @click="saveAccount" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Constants */
import { ShareDataContent } from "@/constants/ModalContent";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Routes */
import { AUTHENTICATION_ROUTE } from "@/router/authRoutes";
import { ACHIEVEMENTS_ROUTE } from "@/router/appRoutes";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";

/** API calls */
import { saveAccountSettings } from "@/api/auth/postAuth";
import { fetchUserAccount } from "@/api/app/fetchUser";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import EditIcon from "@/assets/icons/ic_edit.svg";

const store = useStore();
const router = useRouter();

const isEditActive = ref(false);
const isDataModalActive = ref(false);
const age = ref<number | null>(null);
const bio = ref<string | null>(null);
const weeklyGoal = ref(1);
const shareData = ref(false);
const isDataModalShown = ref(false);

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

const userProfile = computed(() => store.getUserProfile);
const username = computed(() => userProfile.value?.username);

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
  if (weeklyGoal.value === 1) {
    return "w-full";
  } else if (weeklyGoal.value === 2) {
    return "w-1/2";
  } else if (weeklyGoal.value === 3) {
    return "w-1/3";
  } else if (weeklyGoal.value === 4) {
    return "w-1/4";
  } else if (weeklyGoal.value === 5) {
    return "w-1/5";
  } else if (weeklyGoal.value === 6) {
    return "w-1/6";
  } else if (weeklyGoal.value === 7) {
    return "w-[14.3%]";
  }
}

// Update account settings on page load with store data
updateAccountSettings();

async function fetchAccountSettings() {
  try {
    await fetchUserAccount(username.value as string);
    updateAccountSettings();
  } catch (err) {
    console.log(err);
  }
}

function updateAccountSettings() {
  age.value = userProfile.value?.settings?.age ?? null;
  bio.value = userProfile.value?.settings?.bio ?? null;
  weeklyGoal.value = userProfile.value?.settings?.weeklyGoal as number;
  shareData.value = userProfile.value?.settings?.shareData as boolean;
}

function increaseWeeklyGoal() {
  if (weeklyGoal.value === 7) {
    return;
  }
  weeklyGoal.value++;
}

function decreaseWeeklyGoal() {
  if (weeklyGoal.value > 1) {
    weeklyGoal.value--;
  }
}

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}

async function saveAccount() {
  if (!shareData.value && !isDataModalShown.value) {
    showDataModal();
    isDataModalShown.value = true;
    return;
  }
  const settings = {
    username: username.value as string,
    age: age.value,
    bio: bio.value,
    weeklyGoal: weeklyGoal.value,
    shareData: shareData.value,
  };
  if (username.value && weeklyGoal.value) {
    try {
      await saveAccountSettings(settings);
      await fetchAccountSettings();
      isEditActive.value = false;
    } catch (error) {
      // Access token expired
      if ((error as Error).message === "Error while verifying token") {
        store.setAccessToken("");
        store.setIsAuthenticated(false);
        router.push(AUTHENTICATION_ROUTE);
      }
    }
  }
}

function showDataModal() {
  isDataModalActive.value = true;
}

function closeDataModal() {
  isDataModalActive.value = false;
}
</script>
