<template>
  <CHeader />
  <div class="page-wrapper-header">
    <h1>Account settings</h1>
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
    <CButton text="Save" button-class="primary" @click="saveAccount" class="ml-auto mt-8" />
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

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";

/** API calls */
import { saveAccountSettings } from "@/api/auth/postAuth";
import { fetchUserAccount } from "@/api/app/fetchUser";

/** Routes */
import { HOME_ROUTE } from "@/router/appRoutes";

const store = useStore();
const router = useRouter();

const isDataModalActive = ref(false);
const age = ref<number | null>(null);
const bio = ref<string | null>(null);
const weeklyGoal = ref(1);
const shareData = ref(false);
const isDataModalShown = ref(false);

const userProfile = computed(() => store.getUserProfile);
const username = computed(() => userProfile.value?.username);

fetchAccountSettings();
async function fetchAccountSettings() {
  await fetchUserAccount(username.value as string);
  updateAccountSettings();
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

function goToHome() {
  router.push(HOME_ROUTE);
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
