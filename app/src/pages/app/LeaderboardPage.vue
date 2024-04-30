<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1>Leaderboard</h1>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";

const store = useStore();
const router = useRouter();

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
