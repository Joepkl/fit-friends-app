<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-4">Friends</h1>
    <!-- Search for users -->
    <SearchUsers @clicked-user="goToProfile" label-text="Add friend" class="mb-10" />
    <!-- TO-DO Friend Requests -->
    <h2 class="text-green">Open requests</h2>
    <p>No open request at the moment.</p>

    <!-- Friends -->
    <MyFriends class="mt-10" />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import SearchUsers from "@/components/partials/friends/SearchUsers.vue";
import MyFriends from "@/components/partials/friends/MyFriends.vue";

const router = useRouter();

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}
</script>
