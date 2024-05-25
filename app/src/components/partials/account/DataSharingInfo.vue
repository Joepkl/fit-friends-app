<template>
  <section>
    <p>
      In order to use the social functions of the platform we need your permission to share data with other users.
    </p>
    <CButton @click="goToSettings" text="Enable data sharing" button-class="primary" class="mt-4" />
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Routes */
import { ACCOUNT_ROUTE } from "@/router/appRoutes";

const router = useRouter();

function goToSettings() {
  const queryParams = new URLSearchParams({ settingsOpen: "true" }).toString();
  const path = ACCOUNT_ROUTE.path;
  router.push(`${path}?${queryParams}`);
}
</script>
