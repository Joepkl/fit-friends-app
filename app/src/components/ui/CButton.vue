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
      class="h-full w-full"
      :class="{ [`button button-${buttonClass} whitespace-nowrap`]: buttonClass, disabled: isDisabled }"
      :disabled="isDisabled ?? false"
    >
      <img v-if="image" :src="image" :alt="`${name} icon`" />
      {{ text }}
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
