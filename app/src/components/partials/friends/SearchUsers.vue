<template>
  <section class="flex flex-col relative">
    <label for="add-friend">Add a friend</label>
    <input
      @input="searchUsers"
      v-model="searchInput"
      type="text"
      id="add-friend"
      placeholder="Enter a username"
      autocomplete="off"
    />
    <CButton @click="clearSearchInput" v-if="searchInput.length" :image="CloseIcon" class="absolute right-3 top-8" />
    <!-- Search results -->
    <section class="relative">
      <div
        v-if="searchResults.length"
        class="absolute z-50 bottom-0 w-full h-10 bg-gradient-to-t from-light-grey-transparent rounded-bl-default rounded-br-default"
      />
      <ul class="bg-light-grey z-10 rounded-default max-h-[170px] overflow-scroll overflow-x-hidden relative pb-1">
        <li v-for="(user, index) in searchResults" :key="index" class="p-3">
          <button @click="goToProfile(user?.username as string)" class="flex items-center gap-1 w-full">
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
import { ref } from "vue";
import { useRouter } from "vue-router";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Constants */
import type UserProfile from '@/constants/UserProfile';

/** Components */
import CButton from "@/components/ui/CButton.vue";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";


/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_light_grey.svg";

const emits = defineEmits(["click"]);
const router = useRouter();

defineProps<{
  isDisabled?: boolean | null;
}>();

const searchInput = ref("");
const searchResults = ref<Array<UserProfile | null>>([]);

const statusColors = ["bronze", "silver", "gold"];

function searchUsers() {
  const input = searchInput.value.toLowerCase();
  searchResults.value = [];

  if (input !== "") {
    Users.forEach((user) => {
      if (user.username.toLowerCase().includes(input)) {
        searchResults.value.push(user);
      }
    });
  }
}

function clearSearchInput() {
  searchInput.value = "";
  searchResults.value = [];
}

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}

function getColorClass(status: number, isText: boolean | null = null, isBorder: boolean | null = null, isBackground: boolean | null = null) {
  let prefix;
  if(isText) {
    prefix = "text-";
  } else if(isBorder) {
    prefix = "border-";
  } else if(isBackground) {
    prefix = "bg-";
  }
  return prefix + statusColors[status];
}
</script>
