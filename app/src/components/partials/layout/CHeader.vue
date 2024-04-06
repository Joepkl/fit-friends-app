<template>
  <div
    class="flex justify-between transition-all duration-500 z-10 px-default"
    ref="header"
    :class="{
      'sticky top-0 bg-dark-grey-transparent backdrop-blur-[30px] py-4': isHeaderSticky,
      'bg-none py-8': !isHeaderSticky,
    }"
  >
    <div class="flex gap-[10px]">
      <CButton :name="'Cast'" :image="CastIcon" />
      <SearchButton />
    </div>
  </div>
</template>

<script setup lang="ts">
/** Vue */
import { computed, onMounted, ref } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import CButton from "@/components/ui/CButton.vue";
import SearchButton from "@/components/ui/SearchButton.vue";

/** Images */
import CastIcon from "@/assets/icons/ic_cast.svg";

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

<!-- <style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  transition: padding 0.5s;
  z-index: 10;
}

.header-wrapper .sticky {
  position: sticky;
  top: 0;
  background-color: red;
  backdrop-filter: blur(30px);
  padding: 15px 20px;
}

.actions-wrapper {
  display: flex;
  gap: 10px;
}
</style> -->
