<template>
  <CHeader />
  <section class="page-wrapper-header">
    <!-- Account -->
    <section v-if="!isEditActive">
      <AccountIntro
        @edit-is-active="isEditActive = true"
        :is-edit-active="isEditActive"
        :user-profile="userProfile"
        :isLoggedInAccount="true"
        :is-friend="false"
      />
      <AchievementShowCase :achievements="userProfile?.showcaseAchievements || []" :is-logged-in-account="true" />
      <ConsistencyCard
        :weekly-goal="userProfile?.settings?.weeklyGoal || 1"
        :consistency-streak="userProfile?.weeklyConsistencyStreak || 0"
        :weekly-frequency="userProfile?.weeklyFrequency || 0"
        :status="userProfile?.status || 0"
      />
      <PersonalGoalsCard :personal-goals="userProfile?.personalGoals || []" :is-logged-in-account="true" />
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
              <span>Agree to share data with friends (optional)</span>
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
        <CButton @click="isEditActive = false" text="Cancel" button-class="outline" class="mr-10" />
        <CButton @click="saveAccount" text="Save" button-class="primary" :is-disabled="!isDataValid" />
      </div>
    </section>
  </section>
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
import type { Gym } from "@/constants/placeholders/Gyms";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Routes */
import { AUTHENTICATION_ROUTE } from "@/router/authRoutes";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import AccountIntro from "@/components/partials/account/AccountIntro.vue";
import AchievementShowCase from "@/components/partials/account/AchievementShowCase.vue";
import ConsistencyCard from "@/components/partials/account/ConsistencyCard.vue";
import PersonalGoalsCard from "@/components/partials/account/PersonalGoalsCard.vue";
import SearchGym from "@/components/partials/account/SearchGym.vue";

/** API calls */
import { saveAccountSettings } from "@/api/auth/postAuth";
import { fetchUserAccount } from "@/api/app/fetchUser";

const store = useStore();
const router = useRouter();

const isDataValid = ref(false);
const currentGym = ref<null | Gym>(null);
const isEditActive = ref(false);
const isDataModalActive = ref(false);
const age = ref<number | null>(null);
const bio = ref<string | null>(null);
const weeklyGoal = ref(1);
const shareData = ref(false);
const isDataModalShown = ref(false);

const userProfile = computed(() => store.getUserProfile);
const username = computed(() => userProfile.value?.username);

// Update account settings on page load with store data
updateAccountSettings();

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

async function fetchAccountSettings() {
  try {
    await fetchUserAccount(username.value as string);
    updateAccountSettings();
  } catch (err) {
    console.log(err);
  }
}

function handleGymSelect(gym: Gym) {
  currentGym.value = gym;
  isDataValid.value = true;
}

function updateAccountSettings() {
  age.value = userProfile.value?.settings?.age ?? null;
  bio.value = userProfile.value?.settings?.bio ?? null;
  weeklyGoal.value = userProfile.value?.settings?.weeklyGoal as number;
  currentGym.value = userProfile.value?.settings?.currentGym as Gym;
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
