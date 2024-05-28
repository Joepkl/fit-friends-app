<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-4">Create post</h1>
    <form v-if="isDataSharingEnabled" @input="saveInputInLocalStorage" class="mt-6">
      <ul class="flex flex-col gap-4">
        <!-- Date -->
        <li class="flex flex-col">
          <label for="date">Date*</label>
          <input
            @input="checkDateValid"
            v-model="date"
            :class="{ error: !isDateValid }"
            autocomplete="off"
            type="date"
            id="date"
          />
        </li>
        <!-- Description -->
        <li class="flex flex-col">
          <label for="description">Description</label>
          <textarea
            v-model="description"
            id="description"
            rows="3"
            maxlength="70"
            placeholder="Share something about this workout."
            autocomplete="off"
          ></textarea>
        </li>
        <!-- Proud of -->
        <li class="flex flex-col">
          <label for="proud-of">Proud of</label>
          <input v-model="proudOfFirst" autocomplete="off" id="proud-of" type="text" placeholder="Some exercise" />
          <input
            v-model="proudOfSecond"
            autocomplete="off"
            type="text"
            placeholder="Stayed for one hour"
            class="mt-1"
          />
        </li>
        <!-- Accomplished achievements -->
        <li class="flex flex-col mt-1">
          <label for="accomplished-achievements">Accomplished achievements</label>
          <ul id="accomplished-achievements" class="flex flex-col gap-4 mt-2">
            <!-- Selected achievements -->
            <li v-for="(achievement, index) in postInput.achievements" :key="index" class="flex gap-5">
              <a class="flex items-center gap-2">
                <img
                  :src="getAchievementIconFromPercentage(achievement.level as number, achievement.maxLevel as number, achievement.category)"
                  class="w-[56px] h-[56px]"
                  alt="Achievement icon"
                />
                <p>
                  {{ getAchievementInfo(achievement.id as number)?.title }}
                  {{ getAchievementLevel(achievement.level as number) }}
                </p>
              </a>
              <!-- Remove achievement button -->
              <button @click.prevent="removeAchievement(achievement)">
                <img :src="CloseIconGreen" class="w-4 h-4" alt="Close icon" />
              </button>
            </li>
            <!-- Add achievement -->
            <li>
              <a @click="goToAchievements" class="flex items-center gap-2">
                <div class="border-2 block border-white rounded-default p-4 w-fit">
                  <img src="@/assets/icons/ic_add.svg" alt="Add icon" class="w-5 h-5" />
                </div>
                <p>Add achievement</p>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <!-- Errors -->
      <p v-if="dateError" class="error mt-4">{{ dateError }}</p>
      <div class="flex gap-4 justify-end mt-8">
        <!-- Cancel button -->
        <button
          @click.prevent="handleCancelPost"
          :disabled="!isDateValid"
          :class="{ disabled: !isDateValid }"
          class="button button-outline"
        >
          Cancel
        </button>
        <!-- Create post button -->
        <button
          @click.prevent="createPost"
          :disabled="!isDateValid"
          :class="{ disabled: !isDateValid }"
          class="button button-primary"
        >
          Post
        </button>
      </div>
    </form>
    <DataSharingInfo v-else />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Images */
import CloseIconGreen from "@/assets/icons/ic_close_green.svg";

/** Helpers */
import {
  getAchievementIconFromPercentage,
  getAchievementLevel,
  getAchievementInfo,
} from "@/helpers/achievementHelpers";

/** Routes */
import { ACHIEVEMENTS_ROUTE, HOME_ROUTE } from "@/router/appRoutes";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import DataSharingInfo from "@/components/partials/account/DataSharingInfo.vue";

/** Constants */
import type SingleAchievement from "@/constants/SingleAchievement";

/** Helpers */
import { removeInputFromLocalStorage } from "@/helpers/createPostHelpers";


const store = useStore();
const router = useRouter();

const date = ref("");
const dateError = ref("");
const isDateValid = ref(true);
const description = ref("");
const proudOfFirst = ref("");
const proudOfSecond = ref("");

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);
const postInput = computed(() => store.getCreatePostInput);
const posts = computed(() => store.getPosts);
const userAchievementLevels = computed(() => store.getUserAchievementLevels);

const proudOfItems = computed(() => [proudOfFirst.value, proudOfSecond.value].filter((item) => item !== ""));

const currentPostInput = computed(() => {
  return {
    author: userProfile.value?.username as string,
    date: date.value,
    time: getCurrentTimeStamp(),
    description: description.value,
    proudOf: proudOfItems.value,
    achievements: postInput.value.achievements,
    likes: 0,
    comments: [],
    status: userProfile.value?.status as number,
    isLikedByMe: false,
  };
});

function checkDateValid() {
  const inputDate = new Date(date.value);
  const currentDate = new Date();
  // Calculate the date 7 days ago
  const pastWeekDate = new Date(currentDate);
  pastWeekDate.setDate(pastWeekDate.getDate() - 7);
  // Check if the input date is within the past 7 days and not in the future
  isDateValid.value = inputDate <= currentDate && inputDate >= pastWeekDate;

  if (inputDate < pastWeekDate) {
    dateError.value = "Date can't be more than 7 days ago.";
  } else if (inputDate > currentDate) {
    dateError.value = "Date can't be in the future.";
  } else {
    dateError.value = "";
  }
}

function createPost() {
  // Format date
  date.value = formatDateDDYYMM(date.value);
  // Add to posts
  const postsCopy = posts.value;
  postsCopy.unshift(currentPostInput.value);
  // Update user levels in local storage
  updateAchievementLevels();
  // Reset saved inputs in local storage
  removeInputFromLocalStorage();
  // Navigate to home
  router.push(HOME_ROUTE);
}

function updateAchievementLevels() {
  const userLevelsCopy = userAchievementLevels.value;
  const achievementsToUpdate = currentPostInput.value.achievements;

  // Update user achievement levels
  if(achievementsToUpdate) {
    achievementsToUpdate.forEach((achievement) => {
      const achievementToUpdate = userLevelsCopy.find((item) => item.id === achievement.id);
      if(achievementToUpdate) {
        const index = userLevelsCopy.indexOf(achievementToUpdate);
        userLevelsCopy[index].level = achievement.level as number;
      }
    })
  }
  // Save new achievement levels in local storage
  store.setUserAchievementLevels(userLevelsCopy);
}

function saveInputInLocalStorage() {
  store.setCreatePostInput(currentPostInput.value);
}

function formatDateDDYYMM(date: string) {
  const splittedDate = date.split("-");
  return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
}

function getCurrentFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentTimeStamp() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function handleCancelPost() {
  removeInputFromLocalStorage();
  router.push(HOME_ROUTE);
}

function removeAchievement(achievement:SingleAchievement ) {
  if(postInput.value.achievements) {
    const achievements = postInput.value.achievements.filter((item) => item.id !== achievement.id);
    store.setSelectedAchievements(achievements);
  }
}

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

function goToAchievements() {
  router.push(ACHIEVEMENTS_ROUTE);
}


onMounted(() => {
  // Initialize inputs with defaults from the store
  date.value = postInput.value.date || getCurrentFormattedDate();
  description.value = postInput.value.description || "";
  proudOfFirst.value = postInput.value.proudOf[0] || "";
  proudOfSecond.value = postInput.value.proudOf[1] || "";
});
</script>
