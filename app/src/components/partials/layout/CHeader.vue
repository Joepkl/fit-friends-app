<template>
  <header
    class="flex justify-between transition-all duration-500 z-10 px-default"
    ref="header"
    :class="{
      'sticky top-0 bg-dark-grey-30 backdrop-blur-[30px] py-4': isHeaderSticky,
      'bg-none py-8': !isHeaderSticky,
    }"
  >
    <nav class="flex justify-between w-full">
      <CButton name="Account" :image="AccountIcon" :is-link="true" @click="goToAccount" class="w-[30px] h-[25px]" />
      <HamburgerMenu />
    </nav>
  </header>
</template>

<script setup lang="ts">
/** Vue */
import { onMounted, ref } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import HamburgerMenu from "@/components/ui/HamburgerMenu.vue";
import CButton from "@/components/ui/CButton.vue";

/** Images */
import AccountIcon from "@/assets/icons/ic_account_green.svg";

const store = useStore();
const header = ref(null);
const isHeaderSticky = ref(false);

function initObserver(): void {
  let observer = new IntersectionObserver(setStickyHeader, { threshold: 0.3 });
  let target = header.value;
  if (target) {
    observer.observe(target);
  }
}

function setStickyHeader(entries: IntersectionObserverEntry[]): void {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      isHeaderSticky.value = true;
    }
  });
}

function goToAccount() {
  console.log("Go to account route");
}

onMounted(() => {
  initObserver();
  // Handle sticky position for navigation
  document.addEventListener("scroll", (): void => {
    if (window.scrollY <= 5) {
      isHeaderSticky.value = false;
    }
  });
});
</script>
