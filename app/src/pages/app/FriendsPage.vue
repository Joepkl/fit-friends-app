<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-4">Friends</h1>
    <div v-if="isDataSharingEnabled">
      <!-- Search for users -->
      <SearchUsers @clicked-user="goToProfile" label-text="Add friend" class="mb-10" />
      <!-- TO-DO Friend Requests -->
      <h2 class="text-green">Open requests</h2>
      <p>No open request at the moment.</p>
      <!-- Friends -->
      <MyFriends class="mt-10" />
    </div>
    <DataSharingInfo v-else />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import SearchUsers from "@/components/partials/friends/SearchUsers.vue";
import MyFriends from "@/components/partials/friends/MyFriends.vue";
import DataSharingInfo from "@/components/partials/account/DataSharingInfo.vue";

const router = useRouter();
const store = useStore();

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}
</script>
