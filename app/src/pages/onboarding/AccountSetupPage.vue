<template>
  <div class="page-wrapper">
    <img class="w-14 mb-10" src="@/assets/icons/ic_logo.svg" alt="Logo" />
    <h1>Account</h1>
    <p class="mt-4">Get started by setting up your account details.</p>
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
          <input v-model="age" id="age" type="number" placeholder="25" autocomplete="off" />
        </li>
        <!-- Bio -->
        <li class="flex flex-col">
          <label for="bio">Bio</label>
          <input v-model="bio" id="bio" type="text" placeholder="Tell us something about you" autocomplete="off" />
        </li>
        <!-- Current gym -->
        <li class="flex flex-col mb-16 relative">
          <SearchGym
            @selected-gym="handleGymSelect"
            @input-changed="isDataValid = false"
            label-text="Current gym *"
            :selected-gym="currentGym ? currentGym.name : ''"
          />
        </li>
        <!-- Frequency weekly goal -->
        <li class="flex">
          <div class="w-[70%] flex flex-col">
            <label for="weekly-goal">Weekly fitness goal *</label>
            <input v-model="weeklyGoal" disabled id="weekly-goal" type="number" placeholder="2" autocomplete="off" />
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
            <span>Agree to share data with friends (optional)</span>
            <input @input="toggleCheckboxValue" type="checkbox" />
            <span class="checkmark"></span>
          </label>
          <button @click.prevent="showDataModal" class="button-link w-fit ml-6">More info</button>
        </li>
      </ul>
    </form>
    <!-- Modal -->
    <CModal @close-modal="closeDataModal" :isActive="isDataModalActive" :content="ShareDataContent" />
    <!-- CTA -->
    <CButton text="Save" button-class="primary" :is-disabled="!isDataValid" @click="saveAccount" class="ml-auto mt-8" />
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";
import SearchGym from "@/components/partials/account/SearchGym.vue";

/** Constants */
import { ShareDataContent } from "@/constants/ModalContent";
import type { Gym } from "@/constants/placeholders/Gyms";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** API calls */
import { saveAccountSettings } from "@/api/auth/postAuth";
import { fetchUserAccount } from "@/api/app/fetchUser";

/** Routes */
import { HOME_ROUTE } from "@/router/appRoutes";

const store = useStore();
const router = useRouter();

const isDataValid = ref(false);
const currentGym = ref<null | Gym>(null);
const isDataModalActive = ref(false);
const age = ref<number | null>(null);
const bio = ref<string | null>(null);
const weeklyGoal = ref(1);
const shareData = ref(false);
const isDataModalShown = ref(false);

const userProfile = computed(() => store.getUserProfile);
const username = computed(() => userProfile.value?.username);

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

function toggleCheckboxValue() {
  shareData.value = !shareData.value;
}

function goToHome() {
  router.push(HOME_ROUTE);
}

function handleGymSelect(gym: Gym) {
  currentGym.value = gym;
  isDataValid.value = true;
}


async function fetchAccountSettings() {
  try {
    await fetchUserAccount(username.value as string);
  } catch (err) {
    console.log(err);
  }
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
    currentGym: currentGym.value,
    shareData: shareData.value,
  };
  if (username.value && weeklyGoal.value) {
    try {
      await saveAccountSettings(settings);
      fetchAccountSettings();
      goToHome();
    } catch (error) {
      console.error(error);
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
