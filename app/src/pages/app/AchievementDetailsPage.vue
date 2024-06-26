<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-8">Achievement details</h1>
    <!-- Back button -->
    <CButton @click="goBack" :image="BackIcon" class="w-6 h-6 mb-6" />
    <!-- Achievement content -->
    <section v-if="achievementInfo" class="bg-light-grey p-4 rounded-default">
      <h2 class="mb-4 text-green">{{ achievementInfo.title }}</h2>
      <p>{{ achievementInfo.description }}</p>
      <div class="flex flex-col items-start">
        <!-- Info how to claim -->
        <button @click="toggleShowClaimInfo" class="button-link mt-4 mb-2">
          How to claim
          <span
            class="ml-[2px] inline-block"
            :class="{ 'rotate-90': showClaimInfo, 'rotate-[270deg]': !showClaimInfo }"
          >
            &lt;
          </span>
        </button>
        <p v-if="showClaimInfo && !isMonthlyAchievement">
          Claim an achievement by clicking on the icon. When claiming an achievement multiple levels ahead, all the
          achievements between will also be claimed.
        </p>
        <p v-else-if="showClaimInfo">
          Monthly achievements can't be claimed manually. When you reach the requirements for an achievement, it will be
          claimed automatically.
        </p>
        <!-- How to set goal -->
        <button @click="toggleSetGoalInfo" class="button-link mt-2 mb-2">
          How to set goal
          <span
            class="ml-[2px] inline-block"
            :class="{ 'rotate-90': showSetGoalInfo, 'rotate-[270deg]': !showSetGoalInfo }"
          >
            &lt;
          </span>
        </button>
        <p v-if="showSetGoalInfo">
          Click on a not yet claimed achievement to set it as a goal. You can set up to three goals.
        </p>
      </div>
      <!-- Levels -->
      <ul class="mt-8 flex justify-between gap-x-2 gap-y-3 flex-wrap">
        <li v-for="(item, index) in achievementInfo.levels" :key="index" class="w-[30%] min-w-[90px]">
          <button
            @click="handleAchievementClick(userLevel >= Number(index) + 1, Number(index) + 1)"
            class="flex flex-col w-full items-center text-center"
          >
            <img
              :src="getAchievementIconFromPercentage(Number(index) + 1, maxLevel as number, category as number)"
              :class="{ 'opacity-30': userLevel < Number(index) + 1 }"
              class="w-[68px] h-[68px] mb-1"
              alt="Achievement icon"
            />
            <p class="text-green">{{ getAchievementLevel(Number(index) + 1) }} - {{ item.level }}</p>
            <p>{{ item.points }} pts.</p>
          </button>
        </li>
      </ul>
    </section>
    <!-- Claim achievement modal -->
    <CModal
      @close-modal="closeClaimAchievementModal"
      :isActive="isClaimAchievementModalActive"
      :content="!isMonthlyAchievement ? ClaimAchievementContent : ClaimAchievementContentMonthly"
    >
      <p class="mt-2">
        Or you can set
        <span class="text-green">{{ achievementInfo?.title }} {{ achievementSelectedLevel }}</span>
        as a goal to work towards.
      </p>
      <div class="mt-8 flex justify-end gap-x-6">
        <CButton v-if="isMonthlyAchievement" @click="closeClaimAchievementModal" button-class="outline" text="Cancel" />
        <CButton
          @click="handleSetPersonalGoal"
          :button-class="!isMonthlyAchievement ? 'outline' : 'primary'"
          text="Set as goal"
        />
        <CButton v-if="!isMonthlyAchievement" click="handleClaimAchievement" button-class="primary" text="Claim" />
      </div>
    </CModal>
    <!-- Already claimed achievement -->
    <CModal
      @close-modal="closeAlreadyClaimedAchievementModal"
      :isActive="isAlreadyClaimedAchievementModalActive"
      :content="AlreadyClaimedAchievementContent"
    >
      <p class="mt-2">
        Do you want to put
        <span class="text-green">{{ achievementInfo?.title }} {{ achievementSelectedLevel }}</span>
        in your achievements showcase?
      </p>
      <div class="mt-8 flex justify-end">
        <CButton @click="closeAlreadyClaimedAchievementModal" button-class="outline" text="Cancel" class="mr-6" />
        <CButton @click="handleSetShowcaseAchievement" button-class="primary" text="Set showcase" />
      </div>
    </CModal>
    <!-- Slots full showcase modal -->
    <CModal
      @close-modal="toggleSlotsFullShowcaseModal"
      :isActive="isSlotsFullShowcaseModalActive"
      :content="ShowcaseSlotsFullContent"
    >
      <div class="mt-8 flex justify-end">
        <CButton @click="toggleSlotsFullShowcaseModal" button-class="outline" text="Cancel" class="mr-6" />
        <CButton @click="goToAccount" button-class="primary" text="Remove items" />
      </div>
    </CModal>
    <!-- Slots full personal goals modal -->
    <CModal
      @close-modal="toggleSlotsFullGoalsModal"
      :isActive="isSlotsFullGoalsModalActive"
      :content="GoalsSlotsFullContent"
    >
      <div class="mt-8 flex justify-end">
        <CButton @click="toggleSlotsFullGoalsModal" button-class="outline" text="Cancel" class="mr-6" />
        <CButton @click="goToAccount" button-class="primary" text="Remove items" />
      </div>
    </CModal>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Constants */
import {
  ClaimAchievementContent,
  AlreadyClaimedAchievementContent,
  ClaimAchievementContentMonthly,
  ShowcaseSlotsFullContent,
  GoalsSlotsFullContent,
} from "@/constants/ModalContent";

/** Routes */
import { ACHIEVEMENTS_ROUTE, CREATE_POST_ROUTE, ACCOUNT_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Placeholder data */
import Posts from "@/constants/placeholders/Posts";

/** Images */
import BackIcon from "@/assets/icons/ic_back.svg";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Routes */
import { AUTHENTICATION_ROUTE } from "@/router/authRoutes";

/** Helpers */
import {
  getAchievementLevel,
  getAchievementIconFromPercentage,
  getAchievementInfo,
} from "@/helpers/achievementHelpers";

/** API requests */
import { setShowcaseAchievement, setPersonalGoal } from "@/api/settings/postAchievementShowcase";

const router = useRouter();
const store = useStore();

const isClaimAchievementModalActive = ref(false);
const isAlreadyClaimedAchievementModalActive = ref(false);
const showClaimInfo = ref(false);
const showSetGoalInfo = ref(false);
const achievementSelectedLevel = ref("");
const isSlotsFullShowcaseModalActive = ref(false);
const isSlotsFullGoalsModalActive = ref(false);

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);
const postInput = computed(() => store.getCreatePostInput);

const currentAchievementId = computed(() => parseInt(router.currentRoute.value.params.id as string));
const maxLevel = computed(() => achievementInfo?.maxLevel);
const category = computed(() => achievementInfo?.category);
const userLevel = computed(() => getAchievementUserLevel(currentAchievementId.value));
const userAchievementLevels = computed(() => store.getUserAchievementLevels);

const achievement = computed(() => {
  return {
    title: achievementInfo?.title as string,
    id: achievementInfo?.id as number,
    category: achievementInfo?.category as number,
    maxLevel: achievementInfo?.maxLevel as number,
    level: achievementSelectedLevelIndex.value as number,
  };
});

const achievementInfo = getAchievementInfo(currentAchievementId.value);
const achievementSelectedLevelIndex = ref<number | null>(null);

function handleAchievementClick(isAchievementClaimed: boolean, achievementLevel: number) {
  achievementSelectedLevel.value = getAchievementLevel(achievementLevel) as string;
  achievementSelectedLevelIndex.value = achievementLevel;

  if (isAchievementClaimed) {
    isAlreadyClaimedAchievementModalActive.value = true;
  } else {
    isClaimAchievementModalActive.value = true;
  }
}

const isMonthlyAchievement = computed(() => achievement.value.category === 0);
console.log(isMonthlyAchievement.value);

function toggleShowClaimInfo() {
  showClaimInfo.value = !showClaimInfo.value;
}

function toggleSetGoalInfo() {
  showSetGoalInfo.value = !showSetGoalInfo.value;
}

function closeClaimAchievementModal() {
  isClaimAchievementModalActive.value = false;
}

function toggleSlotsFullShowcaseModal() {
  isSlotsFullShowcaseModalActive.value = !isSlotsFullShowcaseModalActive.value;
}

function toggleSlotsFullGoalsModal() {
  isSlotsFullGoalsModalActive.value = !isSlotsFullGoalsModalActive.value;
}

function handleClaimAchievement() {
  if (!isDataSharingEnabled.value) {
    closeClaimAchievementModal();
  } else {
    handleSetAchievements();
    goToCreatePost();
  }
}

function handleSetAchievements() {
  const currentSetAchievements = postInput.value.achievements;

  if (currentSetAchievements) {
    // Find the index of the existing achievement in the array
    const existingIndex = currentSetAchievements.findIndex((item) => item.id === achievement.value.id);

    if (existingIndex !== -1) {
      // If the achievement already exists, replace it with the new one
      currentSetAchievements[existingIndex] = achievement.value;
    } else {
      // If the achievement is not already in the array, push it
      currentSetAchievements.push(achievement.value);
    }
  }
}

function handleExpiredTokenError(error: Error) {
  if (error.message === "Error while verifying token") {
    logOut();
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

async function handleSetShowcaseAchievement() {
  try {
    await setShowcaseAchievement(achievement.value, userProfile.value?.username as string);
    goToAccount();
  } catch (error) {
    handleExpiredTokenError(error as Error);
    closeAlreadyClaimedAchievementModal();
    toggleSlotsFullShowcaseModal();
  }
}

async function handleSetPersonalGoal() {
  try {
    await setPersonalGoal(achievement.value, userProfile.value?.username as string);
    goToAccount();
  } catch (error) {
    handleExpiredTokenError(error as Error);
    closeClaimAchievementModal();
    toggleSlotsFullGoalsModal();
  }
}

function goToAccount() {
  const queryParams = new URLSearchParams({ fetchAccount: "true" }).toString();
  const path = ACCOUNT_ROUTE.path;
  router.push(`${path}?${queryParams}`);
}

function goToCreatePost() {
  router.push(CREATE_POST_ROUTE);
}

function closeAlreadyClaimedAchievementModal() {
  isAlreadyClaimedAchievementModalActive.value = false;
}

function getAchievementUserLevel(id: number) {
  const level = userAchievementLevels.value.find((achievement) => achievement.id === id);
  return level ? level.level : 0;
}

function goBack() {
  router.push(ACHIEVEMENTS_ROUTE);
}
</script>
