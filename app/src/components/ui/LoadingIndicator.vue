<template>
  <div v-if="isLoading" class="loader-wrapper">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.loader {
  width: px(48);
  height: px(48);
  border: px(5) solid var(--green);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
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
