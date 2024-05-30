<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-4">Leaderboard</h1>
    <div v-if="isDataSharingEnabled">
      <p>
        Collect points by claiming the monthly or exercise achievements. The scores reset at the start of every month.
      </p>
      <!-- Time left -->
      <p class="mt-12">
        Time left: <span class="text-green font-semibold">{{ daysLeft }} {{ days }}</span
        >, <span class="text-green font-semibold">{{ hoursLeft }} {{ hours }}</span
        >.
      </p>
      <!-- Leaderboard -->
      <section class="mt-6">
        <ul class="flex flex-col gap-3">
          <li v-for="(user, index) in sortedUsers" :key="index" class="bg-light-grey rounded-default p-4">
            <div v-if="user" @click="goToProfile(user.username)" class="flex items-center flex-wrap">
              <p class="text-green font-semibold mr-3">{{ index + 1 }}.</p>
              <!-- Profile picture -->
              <div
                class="block w-6 h-auto rounded-full border-2 overflow-hidden"
                :class="getColorClass(user.status, null, true)"
              >
                <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
              </div>
              <!-- Username -->
              <p class="ml-[6px]" :class="getColorClass(user.status, true)">{{ user.username }}</p>
              <!-- Points -->
              <p class="ml-auto font-semibold text-green whitespace-nowrap">{{ user.points }} pts.</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <DataSharingInfo v-else />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Constants */
import Users from "@/constants/placeholders/Users";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import DataSharingInfo from "@/components/partials/account/DataSharingInfo.vue";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";

/** Routes */
import { USER_PROFILE_ROUTE, ACCOUNT_ROUTE } from "@/router/appRoutes";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

const store = useStore();
const router = useRouter();

const daysLeft = ref(0);
const hoursLeft = ref(0);

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);
const days = computed(() => (daysLeft.value === 1 ? "day" : "days"));
const hours = computed(() => (hoursLeft.value === 1 ? "hour" : "hours"));

const allUsers = ref([...Users, userProfile.value]);
const sortedUsers = computed(() => getSortedUsers());

function getSortedUsers() {
  return allUsers.value.sort((a, b) => {
    if (!a || !b) {
      return 0;
    }
    return (b.points ?? 0) - (a.points ?? 0);
  });
}

function goToProfile(username: string) {
  if (username === userProfile.value?.username) {
    router.push(ACCOUNT_ROUTE);
  } else {
    router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function calculateTimeLeft() {
  const now = new Date();
  // Get the last day of the current month at 23:59:59.999
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const timeLeft = endOfMonth.getTime() - now.getTime();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // Set values
  daysLeft.value = days;
  hoursLeft.value = hours;
}

calculateTimeLeft();
scrollToTop();
</script>
