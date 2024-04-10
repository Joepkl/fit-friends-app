<template>
  <div v-if="isLoading" class="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <span
      class="loader w-12 h-12 inline-block border-[5px] border-solid border-green border-b-transparent rounded-full"
    ></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<style scoped>
.loader {
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
