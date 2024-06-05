<template>
  <CHeader />
  <section class="page-wrapper-header">
    <h1 class="mb-2">Meetup</h1>

    <div v-if="isDataSharingEnabled">
      <p class="mb-10">
        <span class="mb-2 block">
          Invite your friends to join you on your gym adventures! Working together helps in staying motivated and
          reaching your goals.
        </span>
        <span>
          See when your friends are going in the calendar below and join them, or invite them to join you.
        </span>
      </p>

      <!-- Calendar -->
      <MeetupCalendar
        @open-cancel-meetup-modal="openCancelMeetupModal"
        @join-meetup="handleJoinMeetup"
        :meetups="meetups"
        class="mb-10"
      />

      <!-- Meetups tabs -->
      <MeetupTabs :selectedMeetupTab="selectedMeetupTab" @update-selected-meetup-tab="updateSelectedMeetupTab" />

      <!-- Meetups -->
      <MeetupList
        :selectedMeetupTab="selectedMeetupTab"
        :meetups="acceptedMeetups"
        @open-cancel-meetup-modal="openCancelMeetupModal"
      />

      <!-- Invites -->
      <MeetupInvites
        :selectedMeetupTab="selectedMeetupTab"
        :invites="invites"
        @open-cancel-invite-modal="openCancelInviteModal"
      />

      <!-- Invites sent by me-->
      <MeetupInvitedByMe
        :selectedMeetupTab="selectedMeetupTab"
        :myInvites="myInvites"
        @open-cancel-invite-modal="openCancelInviteModal"
      />

      <!-- Invite tabs-->
      <MeetupInviteTabs :selectedGymTab="selectedGymTab" @update-selected-gym-tab="updateSelectedGymTab" />

      <!-- Invite user from same gym -->
      <InviteUserSameGym :selected-gym-tab="selectedGymTab" @show-invite-modal="showInviteModal" />

      <!-- Invite user from other gym -->
      <section v-if="selectedGymTab === 1" class="mt-4">
        <SearchUsers
          @clicked-user="showInviteModal"
          label-text="Invite a friend"
          :show-only-friends-in-different-gym="true"
        />
      </section>
    </div>
    <DataSharingInfo v-else class="mt-4" />
  </section>

  <!-- Invite user modal -->
  <CModal
    @close-modal="closeInviteModal"
    :isActive="isInviteModalActive"
    :content="CreateMeetupContent"
    :hide-close-button="true"
  >
    <InviteUserModal
      :selectedGymTab="selectedGymTab"
      :selectedUser="selectedUser"
      @close-invite-modal="closeInviteModal"
      @send-invite="sendInvite"
    />
  </CModal>

  <!-- Cancel meetup modal -->
  <CModal
    @close-modal="closeCancelMeetupModal"
    :isActive="isCancelMeetupModalActive"
    :content="CancelMeetupContent"
    :hide-close-button="true"
  >
    <p>
      Are you sure you want to cancel this meetup with <span class="text-green">{{ selectedUser }}</span
      >?
    </p>
    <!-- Buttons -->
    <div class="mt-8 flex justify-end">
      <CButton @click="closeCancelMeetupModal" button-class="outline" text="No" class="mr-6" />
      <CButton @click="cancelMeetup" button-class="primary" text="Yes" />
    </div>
  </CModal>

  <!-- Cancel invite modal -->
  <CModal
    @close-modal="closeCancelInviteModal"
    :isActive="isCancelInviteModalActive"
    :content="CancelInviteContent"
    :hide-close-button="true"
  >
    <p>
      Are you sure you want to cancel this invite to <span class="text-green">{{ selectedUser }}</span
      >?
    </p>
    <!-- Buttons -->
    <div class="mt-8 flex justify-end">
      <CButton @click="closeCancelInviteModal" button-class="outline" text="No" class="mr-6" />
      <CButton @click="cancelInvite" button-class="primary" text="Yes" />
    </div>
  </CModal>
</template>

<script setup lang="ts">
/** Vue */
import { ref, computed } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Placeholder data */
import Users from "@/constants/placeholders/Users";

/** Constants */
import { CreateMeetupContent, CancelMeetupContent, CancelInviteContent } from "@/constants/ModalContent";
import type Meetup from "@/constants/Meetup";

/** Components */
import CHeader from "@/components/partials/layout/CHeader.vue";
import CButton from "@/components/ui/CButton.vue";
import SearchUsers from "@/components/partials/friends/SearchUsers.vue";
import CModal from "@/components/ui/CModal.vue";
import MeetupTabs from "@/components/partials/meetup/MeetupTabs.vue";
import MeetupList from "@/components/partials/meetup/MeetupList.vue";
import MeetupInvites from "@/components/partials/meetup/MeetupInvites.vue";
import MeetupInvitedByMe from "@/components/partials/meetup/MeetupInvitedByMe.vue";
import MeetupInviteTabs from "@/components/partials/meetup/MeetupInviteTabs.vue";
import InviteUserSameGym from "@/components/partials/meetup/InviteUserSameGym.vue";
import InviteUserModal from "@/components/partials/meetup/InviteUserModal.vue";
import MeetupCalendar from "@/components/partials/meetup/MeetupCalendar.vue";
import DataSharingInfo from "@/components/partials/account/DataSharingInfo.vue";

const store = useStore();

const myGym = computed(() => store.getUserProfile?.settings?.currentGym?.name);
const userProfile = computed(() => store.getUserProfile);
const isDataSharingEnabled = computed(() => userProfile.value?.settings?.shareData);

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
const currentDay = now
  .getDate()
  .toString()
  .padStart(2, "0");

const selectedMeetupTab = ref(0);getUserStatus
const selectedGym = ref(myGym.value);
const selectedGymTab = ref(0);
const isInviteModalActive = ref(false);
const selectedUser = ref("");
const isInviteValid = ref(false);
const time = ref(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
const date = ref(`${currentYear}-${currentMonth}-${currentDay}`);
const isCancelMeetupModalActive = ref(false);
const isCancelInviteModalActive = ref(false);
const selectedMeetupId = ref<number | null>(null);
const selectedInviteId = ref<number | null>(null);

// Placeholder value for API response
const meetups = ref<Array<Meetup>>([
    {
    id: 1,
    users: [
      {
        username: "Sarah.B",
        status: 0,
      },
      {
        username: userProfile.value?.username as string,
        status: userProfile.value?.status as number,
      },
    ],
    gym: "Fit for Free Amstelveen",
    date: getDateFormatted(0, 0),
    time: "09:15",
    isJoining: true,
    isPrivate: false,
    isCanceld: false,
  },
  {
    id: 2,
    users: [
      {
        username: "sammy_02",
        status: 1,
      },
      {
        username: userProfile.value?.username as string,
        status: userProfile.value?.status as number,
      },
    ],
    gym: myGym.value as string,
    date: getDateFormatted(2, 0),
    time: "12:00",
    isJoining: true,
    isPrivate: true,
    isCanceld: false,
  },
  {
    id: 3,
    users: [
      {
        username: "GregBlake",
        status: 1,
      },
      {
        username: "Sophia_01",
        status: 2,
      },
      {
        username: "lianne_22",
        status: 1,
      },
    ],
    gym: "Basic-Fit Aalsmeer",
    date: getDateFormatted(3, 0),
    time: "18:30",
    isJoining: false,
    isPrivate: false,
    isCanceld: false,
  },
  {
    id: 4,
    users: [
      {
        username: "jayJo.K",
        status: 2,
      },
      {
        username: "BillyJones",
        status: 2,
      },
    ],
    gym: "Basic-Fit Amstelveen",
    date: getDateFormatted(5, 0),
    time: "18:30",
    isJoining: false,
    isPrivate: false,
    isCanceld: false,
  },
    {
    id: 5,
    users: [
      {
        username: "jayJo.K",
        status: 2,
      },
      {
        username: userProfile.value?.username as string,
        status: userProfile.value?.status as number,
      },
    ],
    gym: myGym.value as string,
    date: getDateFormatted(6, 0),
    time: "18:30",
    isJoining: true,
    isPrivate: false,
    isCanceld: true,
  },
]);

const acceptedMeetups = computed(() => meetups.value.filter((meetup) => meetup.isJoining));

const invites = ref<Array<Meetup>>([]);
const myInvites = ref<Array<Meetup>>([]);

scrollToTop();
function scrollToTop() {
  window.scrollTo(0, 0);
}


function getDateFormatted(dayOffset: number, monthOffset: number) {
  return `${(now.getDate() + dayOffset).toString().padStart(2, '0')}-${(now.getMonth() + 1 + monthOffset).toString().padStart(2, '0')}-${now.getFullYear()}`
}

function updateSelectedMeetupTab(index: number) {
  selectedMeetupTab.value = index;
}

function updateSelectedGymTab(index: number) {
  selectedGymTab.value = index;
}

function closeCancelMeetupModal() {
  isCancelMeetupModalActive.value = false;
}

function handleJoinMeetup(meetupId: number) {
  for(const meetup of meetups.value) {
    if(meetup.id === meetupId) {
      meetup.isJoining = !meetup.isJoining;
      meetup.users.push({
        username: userProfile.value?.username as string,
        status: userProfile.value?.status as number,
      });
    }
  }
}

function openCancelMeetupModal(username: string, meetupId: number) {
  isCancelMeetupModalActive.value = true;
  selectedUser.value = username;
  selectedMeetupId.value = meetupId;
}

function closeCancelInviteModal() {
  isCancelInviteModalActive.value = false;
}

function cancelMeetup() {
  // Make API request here
  isCancelMeetupModalActive.value = false;
  meetups.value = meetups.value.filter((meetup) => meetup.id !== selectedMeetupId.value);
}

function cancelInvite() {
  // Make API request here
  isCancelInviteModalActive.value = false;
  myInvites.value = myInvites.value.filter((invite) => invite.id !== selectedInviteId.value);
}

function showInviteModal(username: string) {
  isInviteModalActive.value = true;
  selectedUser.value = username;
}

function closeInviteModal() {
  isInviteModalActive.value = false;
}

function openCancelInviteModal(username: string, inviteId: number) {
  isCancelInviteModalActive.value = true;
  selectedUser.value = username;
  selectedInviteId.value = inviteId
}

function resetValues() {
  selectedUser.value = "";
  selectedGym.value = myGym.value;
  date.value = `${currentYear}-${currentMonth}-${currentDay}`;
  time.value = `${now.getHours()}:${now.getMinutes()}`;
  isInviteValid.value = false;
}

function compareMeetups(a: Meetup, b: Meetup) {
  const dateA = new Date(`${a.date}T${a.time}`);
  const dateB = new Date(`${b.date}T${b.time}`);
  return dateA.getTime() - dateB.getTime();
}

function getUserStatus(username: string) {
  const user = Users.find((item) => item.username === username);
  return user?.status;
}

function sendInvite(selectedGym: string, date:string, time: string, isPrivate: boolean) {
  // Make API request here
  isInviteModalActive.value = false;

  myInvites.value.push({
    id: myInvites.value.length + 1,
    users: [
      {
        username: selectedUser.value,
        status: getUserStatus(selectedUser.value) || 0,
      },
      {
        username: userProfile.value?.username as string,
        status: userProfile.value?.status as number,
      },
    ],
    gym: selectedGym,
    date: date,
    time: time,
    isJoining: true,
    isPrivate: isPrivate,
  });
  myInvites.value.sort(compareMeetups);
  resetValues();
}
</script>
