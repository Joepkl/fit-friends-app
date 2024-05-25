<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-4">Create post</h1>
    <div v-if="isDataSharingEnabled">
      <p>inputs here</p>
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

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import DataSharingInfo from "@/components/partials/account/DataSharingInfo.vue";

const store = useStore();
const router = useRouter();

const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
