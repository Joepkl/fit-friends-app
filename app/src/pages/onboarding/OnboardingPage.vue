<template>
  <div class="page-wrapper">
    <h1>Onboarding</h1>
    <p class="mt-8 text-lg">
      Hi <span class="text-green font-bold">{{ userProfile?.username }}</span
      >,
    </p>
    <p>Welcome to the Fit Friends platform!</p>
    <p class="mt-4">
      The goal of this platform is to help you achieve your fitness goals while staying up-to-date with your friends'
      activity!
    </p>
    <!-- Quote -->
    <div class="mt-4 flex flex-col">
      <p class="text-green italic">
        "The social context acts as a key determinant of the engagement in physical activity."
      </p>
      <div class="max-w-64 ml-auto mt-2">
        <p>- R. Trigueros</p>
        <p class="text-sm">International Journal of Environmental Research and Public Health</p>
      </div>
    </div>
    <!-- Onboarding steps -->
    <OnboardingSteps
      @next-step="goToNextStep"
      @previous-step="goToPreviousStep"
      @go-to-step="setCurrentStep"
      :title="currentStepContent.title"
      :text="currentStepContent.text"
      :image="currentStepContent.image"
      :current-index="currentStep"
      :total-steps="onboardingContent.steps.length"
      class="mt-12"
    />
  </div>
  <button class="button-outline hidden">test</button>
</template>

<script setup lang="ts">
/** Vue */
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

/** Store */
// @ts-ignore
import { useStore } from "@/stores/store.ts";

/** Components */
import OnboardingSteps from "@/components/partials/onboarding/OnboardingSteps.vue";

/** Routes */
import { ACCOUNT_SETUP_ROUTE } from "@/router/onboardingRoutes";

/** Images */
import OnboardingImage1 from "@/assets/images/img_onboarding_1.png";
import OnboardingImage2 from "@/assets/images/img_onboarding_2.png";
import OnboardingImage3 from "@/assets/images/img_onboarding_3.png";
import OnboardingImage4 from "@/assets/images/img_onboarding_4.png";
import OnboardingImage5 from "@/assets/images/img_onboarding_5.png";

const store = useStore();
const router = useRouter();
const currentStep = ref(0);

const currentStepContent = computed(() => onboardingContent.steps[currentStep.value]);
const userProfile = computed(() => store.getUserProfile);

const onboardingContent = {
  steps: [
    {
      title: "Set goals. Track consistency.",
      text:
        "Choose your own feasible personal goals. Set a goal for weekly fitness frequency, and track your consistency.",
      image: OnboardingImage1,
    },
    {
      title: "Keep up to date with friends' activity.",
      text: "Stay connected with your friends' fitness journey. Share your progress and motivate each other.",
      image: OnboardingImage2,
    },
    {
      title: "Compete with, and against friends.",
      text: "Monthly competition with your friends in achieving fitness goals. Earn points by completing achievements.",
      image: OnboardingImage3,
    },
    {
      title: "Achieve your goals.",
      text: "Set personal goals, and work towards achieving these goals. Stay motivated and consistent.",
      image: OnboardingImage4,
    },
    {
      title: "Meetup with your friends.",
      text: "Connect easy, and meetup with your friends to workout together.",
      image: OnboardingImage5,
    },
  ],
};

const totalSteps = onboardingContent.steps.length;

function goToNextStep() {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  } else {
    router.push(ACCOUNT_SETUP_ROUTE);
  }
}

function goToPreviousStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function setCurrentStep(index: number) {
  currentStep.value = index;
}
</script>
