<template>
  <section>
    <h2 class="text-green mb-2 mt-10">Send invite</h2>
    <div class="flex mb-4">
      <button
        @click="updateTab(0)"
        :class="{ 'bg-green text-dark-grey': selectedGymTab === 0, 'text-green': selectedGymTab !== 0 }"
        class="border-2 border-green rounded-bl-default rounded-tl-default font-semibold px-2 py-1"
      >
        My gym
      </button>
      <button
        @click="updateTab(1)"
        :class="{ 'bg-green text-dark-grey': selectedGymTab === 1, 'text-green': selectedGymTab !== 1 }"
        class="border-2 border-green border-l-0 rounded-br-default rounded-tr-default font-semibold px-2 py-1"
      >
        Other gym
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  selectedGymTab: number;
}>();

const emits = defineEmits(["updateSelectedGymTab"]);

function updateTab(index: number) {
  emits("updateSelectedGymTab", index);
}
</script>
