<template>
  <!-- Link -->
  <a v-if="isLink" class="w-[30px] h-[25px]">
    <img :src="image" :alt="`${name} icon`" />
    <p v-if="text">{{ text }}</p>
  </a>
  <!-- Button -->
  <button v-else class="bg-none border-none w-[30px] h-[25px]">
    <img :src="image" :alt="`${name} icon`" />
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  name: string;
  isLink?: boolean;
  text?: string;
}>();
</script>
