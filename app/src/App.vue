<script setup lang="ts">
/** Vue */
import { computed } from "vue";
import { RouterView } from "vue-router"; // @ts-ignore

/** Store */ import { useStore } from "@/stores/store.ts";

/** Components */
import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";

const store = useStore();

const isLoading = computed(() => {
  if (store.getActiveApiCalls === null || !store.getIsLoading) {
    return false;
  }
  return true;
});
</script>

<template>
  <LoadingIndicator :is-loading="isLoading" />
  <div v-if="store.getIsSearchExpanded" class="fixed inset-0 z-9" @touchstart="store.setIsSearchExpanded(false)" />
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/css/index.css";
@import "@/assets/css/variables.css";
</style>
