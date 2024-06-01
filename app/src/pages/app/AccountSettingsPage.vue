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
      <AchievementShowCase
        v-if="isDataSharingEnabled"
        @showcase-achievement-removed="handleRemoveAchievement"
        :achievements="userProfile?.showcaseAchievements || []"
        :is-logged-in-account="true"
        class="mt-6"
      />
      <ConsistencyCard
        v-if="isDataSharingEnabled"
        @toggle-edit="handleToggleEdit"
        :weekly-goal="userProfile?.settings?.weeklyGoal || 1"
        :consistency-streak="userProfile?.weeklyConsistencyStreak || 0"
        :weekly-frequency="userProfile?.weeklyFrequency || 0"
        :status="userProfile?.status || 0"
        :is-logged-in-account="true"
      />
      <PersonalGoalsCard
        @personal-goal-removed="handleRemovePersonalGoal"
        :personal-goals="userProfile?.personalGoals || []"
        :is-logged-in-account="true"
      />
      <!-- Log out and delete account buttons -->
      <ul
        class="flex gap-4 items-center justify-end"
        :class="{ 'mt-24': !isDataSharingEnabled, 'mt-8': isDataSharingEnabled }"
      >
        <li>
          <CButton @click="toggleLogOutModal" text="Log out" button-class="outline" />
        </li>
        <li>
          <CButton @click="toggleDeleteAccountModal" text="Delete account" button-class="warning" />
        </li>
      </ul>
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
      <!-- Data sharing modal -->
      <CModal @close-modal="closeDataModal" :isActive="isDataModalActive" :content="ShareDataContent" />
      <!-- CTA -->
      <div class="flex justify-end mt-8">
        <CButton @click="isEditActive = false" text="Cancel" button-class="outline" class="mr-10" />
        <CButton @click="saveAccount" text="Save" button-class="primary" :is-disabled="!isDataValid" />
      </div>
    </section>
    <!-- Log out modal -->
    <CModal @close-modal="toggleLogOutModal" :isActive="isLogOutModalActive" :content="LogOutContent">
      <div class="flex gap-4 justify-end flex-wrap mt-6">
        <CButton @click="toggleLogOutModal" text="Cancel" button-class="outline" />
        <CButton @click="logOut" text="Log out" button-class="primary" />
      </div>
    </CModal>
    <!-- Delete account modal -->
    <CModal
      @close-modal="toggleDeleteAccountModal"
      :isActive="isDeleteAccountModalActive"
      :content="DeleteAccountContent"
    >
      <div class="flex gap-4 justify-end flex-wrap mt-6">
        <CButton @click="toggleDeleteAccountModal" text="Cancel" button-class="outline" />
        <CButton @click="handleDeleteAccount" text="Delete" button-class="warning" />
      </div>
    </CModal>
    <button class="button-warning hidden"></button>
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
import { ShareDataContent, LogOutContent, DeleteAccountContent } from "@/constants/ModalContent";
import type { Gym } from "@/constants/placeholders/Gyms";
import type ShowCaseAchievement from "@/constants/ShowCaseAchievement";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Routes */
import { AUTHENTICATION_ROUTE } from "@/router/authRoutes";

/** API requests */
import { deleteAccount } from "@/api/auth/deleteAccount";
import { removeShowcaseAchievement, removePersonalGoal }  from "@/api/settings/deleteAchievement"

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import AccountIntro from "@/components/partials/account/AccountIntro.vue";
import AchievementShowCase from "@/components/partials/account/AchievementShowCase.vue";
import ConsistencyCard from "@/components/partials/account/ConsistencyCard.vue";
import PersonalGoalsCard from "@/components/partials/account/PersonalGoalsCard.vue";
import SearchGym from "@/components/partials/account/SearchGym.vue";

/** Placeholder data */
import Posts from "@/constants/placeholders/Posts";

/** API calls */
import { saveAccountSettings } from "@/api/auth/postAuth";
import { fetchUserAccount } from "@/api/app/fetchUser";

const store = useStore();
const router = useRouter();

const isDataValid = ref(true);
const currentGym = ref<null | Gym>(null);
const isEditActive = ref(false);
const isLogOutModalActive = ref(false);
const isDeleteAccountModalActive = ref(false);
const isDataModalActive = ref(false);
const age = ref<number | null>(null);
const bio = ref<string | null>(null);
const weeklyGoal = ref(1);
const shareData = ref(false);
const isDataModalShown = ref(false);

const userProfile = computed(() => store.getUserProfile);
const username = computed(() => userProfile.value?.username);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);

// Update account settings on page load with store data
updateAccountSettings();

// Open settings if enabled by query params
checkIfSettingsOpen();

// Fetch account settings if query param is enabled
checkIfFetchAccount();

function checkIfSettingsOpen() {
  if(router.currentRoute.value.query.settingsOpen) {
    isEditActive.value = true;
    // Remove query param
    router.replace(router.currentRoute.value.path);
  }
}

function handleToggleEdit() {
  isEditActive.value = !isEditActive.value;
}

async function handleRemoveAchievement(achievement: ShowCaseAchievement) {
  try {
    await removeShowcaseAchievement(achievement, userProfile.value?.username as string);
    await fetchAccountSettings();
  } catch(error) {
    handleExpiredTokenError(error as Error);
  }
}

async function handleRemovePersonalGoal(achievement: ShowCaseAchievement) {
  try {
    await removePersonalGoal(achievement, userProfile.value?.username as string);
    await fetchAccountSettings();
  } catch(error) {
    handleExpiredTokenError(error as Error);
  }
}

async function checkIfFetchAccount() {
  if(router.currentRoute.value.query.fetchAccount) {
    try {
      await fetchAccountSettings();
    } catch (error) {
      handleExpiredTokenError(error as Error);
    }
    // Remove query param
    router.replace(router.currentRoute.value.path);
  }
}

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

async function fetchAccountSettings() {
  console.log('FIRES')
  try {
    await fetchUserAccount(username.value as string);
    updateAccountSettings();
  } catch (error) {
    handleExpiredTokenError(error as Error);
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

function logOut() {
  store.setAccessToken("");
  store.setIsAuthenticated(false);
  router.push(AUTHENTICATION_ROUTE);
  // Reset selected achievements and posts from local storage
  // This exists as placeholder for sample usage of the app. Eventually this will be handled by the API.
  store.setSelectedAchievements([]);
  store.setPosts(Posts);
}

async function handleDeleteAccount() {
  try {
    await deleteAccount(userProfile.value?.username as string);
    logOut();
  } catch(error) {
    handleExpiredTokenError(error as Error);
  }
}

function handleExpiredTokenError(error: Error) {
  if ((error).message === "Error while verifying token") {
    logOut();
  }
}

function toggleLogOutModal() {
  isLogOutModalActive.value = !isLogOutModalActive.value;
}

function toggleDeleteAccountModal() {
  isDeleteAccountModalActive.value = !isDeleteAccountModalActive.value;
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
      handleExpiredTokenError(error as Error);
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
