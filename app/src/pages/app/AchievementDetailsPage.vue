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
        <p v-if="showClaimInfo">
          Claim an achievement by clicking on the icon. When claiming an achievement multiple levels ahead, all the
          achievements between will also be claimed.
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
      :content="ClaimAchievementContent"
    >
      <p class="mt-2">
        Or you can set
        <span class="text-green">{{ achievementInfo?.title }} {{ achievementSelectedLevel }}</span>
        as a goal to work towards.
      </p>
      <div class="mt-8 flex justify-end">
        <CButton @click="goToProfilePage" button-class="outline" text="Set as goal" class="mr-6" />
        <CButton @click="handleClaimAchievement" button-class="primary" text="Claim" />
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
        <CButton @click="goToProfilePage" button-class="primary" text="Set showcase" />
      </div>
    </CModal>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Constants */
import { AchievementLevels } from "@/constants/placeholders/AchievementLevels";
import { ClaimAchievementContent, AlreadyClaimedAchievementContent } from "@/constants/ModalContent";

/** Routes */
import { ACHIEVEMENTS_ROUTE, CREATE_POST_ROUTE, ACCOUNT_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Images */
import BackIcon from "@/assets/icons/ic_back.svg";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Helpers */
import {
  getAchievementLevel,
  getAchievementIconFromPercentage,
  getAchievementInfo,
} from "@/helpers/achievementHelpers";

const router = useRouter();
const store = useStore();

const isClaimAchievementModalActive = ref(false);
const isAlreadyClaimedAchievementModalActive = ref(false);
const showClaimInfo = ref(false);
const showSetGoalInfo = ref(false);
const achievementSelectedLevel = ref("");

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);
const selectedAchievments = computed(() => store.getSelectedAchievements);

const currentAchievementId = computed(() => parseInt(router.currentRoute.value.params.id as string));
const maxLevel = computed(() => achievementInfo?.maxLevel);
const category = computed(() => achievementInfo?.category);
const userLevel = computed(() => getAchievementUserLevel(currentAchievementId.value));

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

function toggleShowClaimInfo() {
  showClaimInfo.value = !showClaimInfo.value;
}

function toggleSetGoalInfo() {
  showSetGoalInfo.value = !showSetGoalInfo.value;
}

function closeClaimAchievementModal() {
  isClaimAchievementModalActive.value = false;
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
  const currentSetAchievements = selectedAchievments.value;

  const achievement = {
    title: achievementInfo?.title as string,
    id: achievementInfo?.id as number,
    category: achievementInfo?.category as number,
    maxLevel: achievementInfo?.maxLevel as number,
    level: achievementSelectedLevelIndex.value as number,
  };

  // Find the index of the existing achievement in the array
  const existingIndex = currentSetAchievements.findIndex((item) => item.id === achievement.id);

  if (existingIndex !== -1) {
    // If the achievement already exists, replace it with the new one
    currentSetAchievements[existingIndex] = achievement;
  } else {
    // If the achievement is not already in the array, push it
    currentSetAchievements.push(achievement);
  }
}

function goToCreatePost() {
  router.push(CREATE_POST_ROUTE);
}

function goToProfilePage() {
  router.push(ACCOUNT_ROUTE);
}

function closeAlreadyClaimedAchievementModal() {
  isAlreadyClaimedAchievementModalActive.value = false;
}

function getAchievementUserLevel(id: number) {
  const achievement = AchievementLevels.find((achievement) => achievement.id === id);
  return achievement ? achievement.level : 1;
}

function goBack() {
  router.push(ACHIEVEMENTS_ROUTE);
}
</script>
