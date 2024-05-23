<template>
  <section class="flex flex-col relative">
    <label for="input-search">{{ labelText }}</label>
    <input
      @input="searchUsers"
      v-model="searchInput"
      type="text"
      id="input-search"
      placeholder="Enter username"
      autocomplete="off"
    />
    <CButton @click="clearSearchInput" v-if="searchInput.length" :image="CloseIcon" class="absolute right-3 top-8" />
    <!-- Search results -->
    <section class="relative">
      <div
        v-if="searchResults.length"
        class="absolute z-50 bottom-0 w-full h-5 bg-gradient-to-t from-light-grey-transparent rounded-bl-default rounded-br-default"
      />
      <ul class="bg-light-grey z-10 rounded-default max-h-[170px] overflow-scroll overflow-x-hidden relative pb-1">
        <li v-for="(user, index) in searchResults" :key="index" class="p-3">
          <button @click="handleClickUser(user?.username as string)" class="flex items-center gap-1 w-full">
            <div
              class="block w-6 h-auto rounded-full border-2 overflow-hidden"
              :class="getColorClass(user?.status as number, null, true)"
            >
              <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
            </div>
            <p :class="getColorClass(user?.status as number, true)">{{ user?.username as string }}</p>
          </button>
        </li>
        <!-- No results -->
        <li v-if="searchInput && !searchResults.length">
          <p class="p-3">No results found for "{{ searchInput }}"</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

/** Constants */
import type UserProfile from '@/constants/UserProfile';

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_light_grey.svg";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

const emits = defineEmits(["clickedUser"]);

const props = defineProps<{
  labelText: string;
  isDisabled?: boolean | null;
  showOnlyFriendsInDifferentGym?: boolean | null;
}>();

const store = useStore();
const searchInput = ref("");
const searchResults = ref<Array<UserProfile | null>>([]);

const currentGym = computed(() => store.getUserProfile?.settings?.currentGym);

function searchUsers() {
  const input = searchInput.value.toLowerCase();
  searchResults.value = [];
  let usersToSearch = Users;

  if (input !== "") {
    // Find users in same gym
    if(props.showOnlyFriendsInDifferentGym) {
      usersToSearch = Users.filter(user => {
        return user.settings?.currentGym?.id !== currentGym.value?.id;
      })
    }
    usersToSearch.forEach((user) => {
      if (user.username.toLowerCase().includes(input)) {
        searchResults.value.push(user);
      }
    });
  }
}


function handleClickUser(username: string) {
  emits("clickedUser", username);
}

function clearSearchInput() {
  searchInput.value = "";
  searchResults.value = [];
}
</script>
