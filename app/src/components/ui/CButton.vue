<template>
  <button class="bg-none border-none">
    <img class="w-[30px] h-[25px]" :src="image" :alt="`${name} icon`" />
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  image: string;
  name: string;
  text?: string;
}>();
</script>
