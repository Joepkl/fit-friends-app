<template>
  <div>
    <CHeader />
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { computed } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";

const store = useStore();
const router = useRouter();
</script>
