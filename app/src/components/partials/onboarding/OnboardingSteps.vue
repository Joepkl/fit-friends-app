<template>
  <div class="bg-light-grey py-8 px-6 rounded-default">
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
    <img class="rounded-default mt-6" :src="image" alt="Timeline image" />
    <div class="flex justify-between mt-10">
      <CButton v-if="currentIndex > 0" @click="previousStep" text="Previous" button-class="outline" />
      <CButton @click="nextStep" :text="nextButtonText" button-class="primary" class="ml-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { computed } from "vue";

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

function nextStep() {
  emits("next-step");
}

function previousStep() {
  emits("previous-step");
}

function goToStep(index: number) {
  emits("go-to-step", index);
}
</script>
