<template>
  <div
    v-if="isActive"
    class="z-50 bg-light-grey border-[2px] border-solid border-green w-10/12 max-w-96 fixed top-1/3 left-1/2 transform -translate-x-1/2 px-9 py-5 rounded-default"
  >
    <!-- Cose button -->
    <CButton @click="closeModal" :image="CloseIcon" class="button absolute right-5 top-5" />
    <!-- Modal content -->
    <h2 class="text-green mt-5 mb-2">{{ content.title }}</h2>
    <p>{{ content.text }}</p>
    <!-- Additional content -->
    <slot />
  </div>
  <!-- Overlay -->
  <div
    class="fixed h-[100dvh] inset-0 z-40 bg-dark-grey-80"
    :class="{ block: isActive, hidden: !isActive }"
    @click="disableClick($event)"
  />
</template>

<script setup lang="ts">
/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Constants */
import type { ModalContent } from "@/constants/ModalContent";

/** Images */
import CloseIcon from "@/assets/icons/ic_close_green.svg";

const emits = defineEmits(["close-modal"]);

defineProps<{
  isActive: boolean;
  content: ModalContent
}>();

function disableClick(e: Event) {
  e.preventDefault();
}

function closeModal() {
  emits("close-modal");
}
</script>
