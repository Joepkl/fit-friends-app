<template>
  <div
    class="bg-light-grey py-8 px-6 rounded-default"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <ul class="flex justify-center gap-2 mb-6">
      <li
        v-for="(step, index) in totalSteps"
        :key="index"
        @click="goToStep(index)"
        class="rounded-full border-2 border-green w-5 h-5"
        :class="{ 'bg-green': index === currentIndex }"
      ></li>
    </ul>
    <h2 class="text-green">{{ title }}</h2>
    <p class="mt-4">{{ text }}</p>
    <img class="rounded-default mt-6" :src="image" alt="Timeline image" draggable="false" />
    <div class="flex justify-between mt-10">
      <CButton v-if="currentIndex > 0" @click="previousStep" text="Previous" button-class="outline" />
      <CButton @click="nextStep" :text="nextButtonText" button-class="primary" class="ml-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { computed, ref } from "vue";

/** Components */
import CButton from "@/components/ui/CButton.vue";

const emits = defineEmits(["next-step", "previous-step", "go-to-step"]);

const props = defineProps<{
  title: string;
  text: string;
  image: string;
  currentIndex: number;
  totalSteps: number;
}>();

const nextButtonText = computed(() => (props.currentIndex === props.totalSteps - 1 ? "Finish" : "Next"));

function nextStep(isFiredBySwipe = false) {
  // Emit to parent if event is fired by swipe
  emits("next-step", isFiredBySwipe);
}

function previousStep() {
  emits("previous-step");
}

function goToStep(index: number) {
  emits("go-to-step", index);
}

// Swipe detection variables
let startX = 0;
let startY = 0;
const isSwiping = ref(false);

function handleTouchStart(event: TouchEvent) {
  const touch = event.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  isSwiping.value = true;
}

function handleTouchMove(event: TouchEvent) {
  if (!isSwiping.value) return;

  const touch = event.touches[0];
  const endX = touch.clientX;
  const endY = touch.clientY;

  const diffX = endX - startX;
  const diffY = endY - startY;

  // Check if swipe is horizontal and significant enough
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
    if (diffX > 0) {
      previousStep();
    } else {
      nextStep(true);
    }
    isSwiping.value = false;
  }
}

function handleTouchEnd() {
  isSwiping.value = false;
}
</script>
