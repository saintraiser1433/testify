<script lang="ts" setup>
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
    <UICard
      :has-header="false"
      :body="{ base: 'dark:bg-gray-800' }"
      :defaults="{
        base: 'max-w-xl px-5 mb-10 lg:py-10 border-t-8 border-primary drop-shadow-md',
      }"
      :background="{ base: 'dark:bg-gray-800' }"
    >
      <div class="flex flex-col justify-center items-center text-center gap-5">
        <h1 class="font-bold">Thank you for completing the exam!</h1>
        <h3 class="font-normal">We are redirecting you to the home page in:</h3>
        <CircleProgressBar
          stroke-width="16"
          size="200"
          color-filled="#28c76f"
          :color-unfilled="colorUnfilled"
          animation-duration="1s"
          :value="remainingTime"
          :max="10"
          rounded
        >
          <h1 class="font-bold">{{ remainingTime }}</h1>
        </CircleProgressBar>
      </div>
    </UICard>
  </div>
</template>
