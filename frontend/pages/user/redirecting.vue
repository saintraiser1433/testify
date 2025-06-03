<script lang="ts" setup>
definePageMeta({
  requiredRole: "examinee",
  layout: "user",
});

useSeoMeta({
  title: "Testify User Exam",
  description: "This is an redirection page",
  ogTitle: "Testify User Exam",
  ogDescription: "This is an redirection page",
});

const { remainingTime, startTimerNavigation, clearExistingTimer } = useExamTimer();

const colorUnfilled = computed(() => {
  if (remainingTime.value >= 1 && remainingTime.value <= 2) return "#ff4c51";
  if (remainingTime.value >= 3 && remainingTime.value <= 4) return "#6147e4";
  if (remainingTime.value >= 5 && remainingTime.value <= 7) return "#00bad1";
  return "#28c76f";
});

onMounted(() => {
  startTimerNavigation(10, "user");
});

onUnmounted(() => {
  clearExistingTimer();
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <UICard :has-header="false" :body="{ base: 'dark:bg-gray-800  ', padding: 'sm:px-0 sm:py-0 px-0 py-0 ' }" :defaults="{
      base: 'max-w-3xl  mb-10   drop-shadow-md  overflow-hidden',
    }" :background="{ base: 'dark:bg-gray-800' }">
      <div class="grid grid-cols-12">
        <div class="flex flex-col py-12 px-3 justify-center items-center text-center gap-5 col-span-12 lg:col-span-6">
          <h1 class="font-bold">Thank you for completing the exam!</h1>
          <h3 class="font-normal">We are redirecting you to the home page in:</h3>
          <CircleProgressBar stroke-width="5" size="200" color-filled="#28c76f" :color-unfilled="colorUnfilled"
            animation-duration="1s" :value="remainingTime" :max="10" rounded>
            <h1 class="font-bold">{{ remainingTime }}</h1>
          </CircleProgressBar>
        </div>
        <div
          class="relative col-span-6 bg-gradient-to-br from-yellow-300 via-pink-400 to-rose-500 hidden lg:inline-block">
          <NuxtImg src="/bg-image/cheerr.png" fit="cover" height="430" class="mt-5 mx-auto" alt="Hero Bg"
            loading="lazy"></NuxtImg>
        </div>
      </div>
    </UICard>
  </div>
</template>
