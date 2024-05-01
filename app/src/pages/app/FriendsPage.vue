<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-6">Friends</h1>
    <!-- Search for users -->
    <SearchUsers />
    <!-- Friends -->
    <MyFriends />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import SearchUsers from "@/components/partials/friends/SearchUsers.vue";
import MyFriends from "@/components/partials/friends/MyFriends.vue";

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
