<template>
  <section>
    <h2 class="text-green mb-4">My friends ({{ usersCopy.length }})</h2>
    <ul>
      <li v-for="(user, index) in usersCopy" :key="index" class="bg-light-grey mt-3 p-3 flex rounded-default">
        <button @click="goToProfile(user.username)" class="flex items-center gap-[6px]">
          <div
            class="block w-6 h-auto rounded-full border-2 overflow-hidden"
            :class="getColorClass(user.status, null, true)"
          >
            <img class="p-[2px] relative top-[4px] left-[1px]" :src="AccountIcon" alt="Profile picture" />
          </div>
          <p :class="getColorClass(user.status, true)">{{ user.username }}</p>
        </button>
        <!-- Remove friend button -->
        <CButton
          @click="showRemoveFriendModal(user.username)"
          :image="CloseIcon"
          class="w-4 h-4 relative top-1 ml-auto"
        />
      </li>
    </ul>
    <!-- Remove friend modal -->
    <CModal
      @close-modal="closeRemoveFriendModal"
      :isActive="isRemoveFriendModalActive"
      :content="RemoveFriendContent"
      :hide-close-button="true"
    >
      <p>
        Are you sure you want to remove <span class="text-green">{{ selectedFriend }}</span> from your friends?
      </p>
      <p class="mt-2">This action can't be undone.</p>
      <div class="mt-8 flex justify-end">
        <CButton @click="closeRemoveFriendModal" button-class="outline" text="Cancel" />
        <CButton @click="removeFriend" button-class="primary" text="Remove" class="ml-6" />
      </div>
    </CModal>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";
import { useRouter } from "vue-router";

/** Routes */
import { USER_PROFILE_ROUTE } from "@/router/appRoutes";

/** Constants */
import { RemoveFriendContent } from "@/constants/ModalContent";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import CloseIcon from "@/assets/icons/ic_close_green.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

const router = useRouter();
const isRemoveFriendModalActive = ref(false);
const selectedFriend = ref<string | null>(null);

const usersCopy = ref(Users);

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}

function goToProfile(username: string) {
  router.push({ name: USER_PROFILE_ROUTE.name, params: { username: username } });
}

function showRemoveFriendModal(username: string) {
  isRemoveFriendModalActive.value = true;
  selectedFriend.value = username;
}

function closeRemoveFriendModal() {
  isRemoveFriendModalActive.value = false;
}

function removeFriend() {
  // Make API request here to remove from DB
  closeRemoveFriendModal();
  usersCopy.value = usersCopy.value.filter((user) => user.username !== selectedFriend.value);
}
</script>
