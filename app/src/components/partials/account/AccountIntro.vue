<template>
  <section>
    <!-- Profile picture, name and bio -->
    <button
      class="block w-full mx-auto max-w-24 h-auto rounded-full border-2 overflow-hidden"
      :class="getColorClass(userProfile?.status as number, null, true)"
    >
      <img class="p-3 relative top-4 left-[2px]" :src="AccountIcon" alt="Profile picture" />
    </button>
    <div class="flex mt-4 justify-center items-center relative">
      <div>
        <h1 :class="getColorClass(userProfile?.status as number, true)">
          @{{ userProfile?.username
          }}<span v-if="userProfile?.settings?.age" class="text-white font-medium"
            >, {{ userProfile?.settings?.age }}
          </span>
        </h1>
      </div>
      <!-- Remove friend button -->
      <CButton
        @click="showRemoveFriendModal"
        v-if="!isLoggedInAccount && isUserFriend"
        :image="CloseIcon"
        class="w-5 h-5 absolute right-0"
      />
      <!-- Add friend button -->
      <CButton
        @click="showAddFriendModal"
        v-else-if="!isLoggedInAccount && !isUserFriend && !isFriendRequestPending"
        :image="AddIcon"
        class="w-5 h-5 absolute right-0"
      />
      <!-- Edit account button -->
      <CButton v-if="isLoggedInAccount" @click="emitEditActive" :image="EditIcon" class="relative left-5 w-6 h-6" />
    </div>
    <p class="text-center mt-4">{{ userProfile?.settings?.bio }}</p>
    <p class="text-center text-green mt-2">Gym: {{ userProfile?.settings?.currentGym?.name }}</p>
    <!-- Pending friend request -->
    <CButton
      v-if="isFriendRequestPending"
      text="Pending friend request"
      button-class="primary"
      :is-disabled="true"
      class="ml-auto w-fit mt-6"
    />
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
    <!-- Add friend modal -->
    <CModal
      @close-modal="closeAddFriendModal"
      :isActive="isAddFriendModalActive"
      :content="AddFriendContent"
      :hide-close-button="true"
    >
      <p>
        Send a friend request to <span class="text-green">{{ selectedFriend }}</span
        >?
      </p>
      <div class="mt-8 flex justify-end">
        <CButton @click="closeAddFriendModal" button-class="outline" text="Cancel" class="mr-6" />
        <CButton @click="sendFriendRequest" button-class="primary" text="Send request" />
      </div>
    </CModal>
  </section>
</template>

<script setup lang="ts">
/** Vue */
import { ref } from "vue";

/** Images */
import AccountIcon from "@/assets/icons/ic_account.svg";
import EditIcon from "@/assets/icons/ic_edit.svg";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import CModal from "@/components/ui/CModal.vue";

/** Constants */
import type UserProfile from '@/constants/UserProfile';
import { RemoveFriendContent } from "@/constants/ModalContent";
import { AddFriendContent } from "@/constants/ModalContent";

/** Images */
import CloseIcon from "@/assets/icons/ic_close_green.svg";
import AddIcon from "@/assets/icons/ic_add_green.svg";

/** Helpers */
import { getColorClass } from "@/helpers/userHelpers";

const props = defineProps<{
  isEditActive: boolean;
  isLoggedInAccount: boolean;
  isFriend: boolean;
  userProfile: UserProfile | null;
}>();

const emits = defineEmits(["editIsActive"]);

const selectedFriend = ref(props.userProfile?.username);
const isRemoveFriendModalActive = ref(false);
const isAddFriendModalActive = ref(false);
const isUserFriend = ref(props.isFriend)
const isFriendRequestPending = ref(false);

function emitEditActive() {

  emits("editIsActive");
}

function showAddFriendModal() {
  isAddFriendModalActive.value = true;
}

function showRemoveFriendModal() {
  isRemoveFriendModalActive.value = true;
}

function closeRemoveFriendModal() {
  isRemoveFriendModalActive.value = false;
}

function closeAddFriendModal() {
  isAddFriendModalActive.value = false;
}

function removeFriend() {
  isUserFriend.value = false;
  // Make API request here to remove from DB
  closeRemoveFriendModal();
}

function sendFriendRequest() {
  // Make API request here to send request to user
  closeAddFriendModal();
  isFriendRequestPending.value = true;
}
</script>
