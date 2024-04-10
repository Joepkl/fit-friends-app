<template>
  <div>
    <!-- Link -->
    <a v-if="isLink" @click="handleClick">
      <img :src="image" :alt="`${name} icon`" />
      <p v-if="text">{{ text }}</p>
    </a>
    <!-- Button -->
    <button
      v-else
      @click="handleClick"
      class="bg-none border-none h-full w-full"
      :class="{ [`button-${buttonClass}`]: buttonClass, disabled: isDisabled }"
    >
      <img v-if="image" :src="image" :alt="`${name} icon`" />
      <p v-if="text">{{ text }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["click"]);

defineProps<{
  isDisabled?: boolean | null;
  name?: string;
  buttonClass?: string;
  image?: string;
  isLink?: boolean;
  text?: string;
}>();

function handleClick(): void {
  emits("click");
}
</script>
