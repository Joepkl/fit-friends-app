<template>
  <section class="flex flex-col absolute w-full">
    <label for="input-search">{{ labelText }}</label>
    <input
      @input="searchGym"
      v-model="searchInput"
      type="text"
      id="input-search"
      placeholder="Search for your gym"
      autocomplete="off"
    />
    <CButton
      v-if="searchInput.length && isSearchActive"
      @click="clearSearchInput"
      :image="CloseIcon"
      class="absolute right-3 top-8"
    />
    <!-- Search results -->
    <section class="relative">
      <div
        v-if="searchResults.length"
        class="absolute z-50 bottom-0 w-full h-5 bg-gradient-to-t from-light-grey-transparent rounded-bl-default rounded-br-default"
      />
      <ul class="bg-light-grey z-10 rounded-default max-h-[170px] overflow-scroll overflow-x-hidden relative pb-1">
        <li v-for="(gym, index) in searchResults" :key="index" class="p-3">
          <button @click.prevent="handleClickgym(gym as Gym)" class="flex items-center gap-1 w-full">
            {{ gym?.name }}
          </button>
        </li>
        <!-- No results -->
        <li v-if="isSearchActive && searchInput.length && !searchResults.length">
          <p class="p-3">No results found for "{{ searchInput }}"</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Placeholder data */
import { Gyms } from "@/constants/placeholders/Gyms";
import type { Gym } from "@/constants/placeholders/Gyms";

/** Images */
import CloseIcon from "@/assets/icons/ic_close_light_grey.svg";

const emits = defineEmits(["selectedGym", "inputChanged"]);

const props = defineProps<{
  labelText: string;
  selectedGym: string;
  isDisabled?: boolean | null;
}>();

const isSearchActive = ref(false);
const searchInput = ref(props.selectedGym);
const searchResults = ref<Array<Gym | null>>([]);

function searchGym() {
  isSearchActive.value = true;
  const input = searchInput.value.toLowerCase();
  searchResults.value = [];

  if (input !== "") {
    Gyms.forEach((gym) => {
      if (gym.name.toLowerCase().includes(input)) {
        searchResults.value.push(gym);
      }
    });
  }

  emits("inputChanged");
}

function handleClickgym(gym: Gym) {
  isSearchActive.value = false;
  searchInput.value = gym.name;
  searchResults.value = [];
  emits("selectedGym", gym);
}

function clearSearchInput() {
  searchInput.value = "";
  searchResults.value = [];
}
</script>
