<template>
  <section>
    <h2 class="text-green mb-2">My meetups</h2>
    <div class="flex mb-4">
      <button
        @click="updateTab(0)"
        :class="{ 'bg-green text-dark-grey': selectedMeetupTab === 0, 'text-green': selectedMeetupTab !== 0 }"
        class="border-2 border-green rounded-bl-default rounded-tl-default font-semibold px-2 py-1"
      >
        Meetups
      </button>
      <button
        @click="updateTab(1)"
        :class="{ 'bg-green text-dark-grey': selectedMeetupTab === 1, 'text-green': selectedMeetupTab !== 1 }"
        class="border-2 border-green border-l-0 font-semibold px-2 py-1"
      >
        Invites
      </button>
      <button
        @click="updateTab(2)"
        :class="{ 'bg-green text-dark-grey': selectedMeetupTab === 2, 'text-green': selectedMeetupTab !== 2 }"
        class="border-2 border-green border-l-0 rounded-br-default rounded-tr-default font-semibold px-2 py-1"
      >
        Invited by me
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  selectedMeetupTab: number;
}>();

const emits = defineEmits(["updateSelectedMeetupTab"]);

function updateTab(index: number) {
  emits("updateSelectedMeetupTab", index);
}
</script>
