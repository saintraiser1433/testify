<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  countDown: {
    type: Number,
    default: 10,
  },
  navigateTo: {
    type: String,
    required: true,
  },
});

const { countDown, navigateTo } = toRefs(props);

const { remainingTime, startTimerNavigation, clearExistingTimer } = useExamTimer();

const colorUnfilled = computed(() => {
  if (remainingTime.value >= 1 && remainingTime.value <= 2) return "#ff4c51";
  if (remainingTime.value >= 3 && remainingTime.value <= 4) return "#6147e4";
  if (remainingTime.value >= 5 && remainingTime.value <= 7) return "#00bad1";
  return "#28c76f";
});

onMounted(() => {
  startTimerNavigation(countDown.value, navigateTo.value);
});

onUnmounted(() => {
  clearExistingTimer();
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <UICard
      :has-header="false"
      :body="{ base: 'dark:bg-gray-800 sm:px-0 sm:py-0' }"
      :defaults="{
        base: 'max-w-3xl  mb-10  drop-shadow-md  overflow-hidden',
      }"
      :background="{ base: 'dark:bg-gray-800' }"
    >
      <div class="grid grid-cols-12">
        <div
          class="flex flex-col py-12 px-3 justify-center items-center text-center gap-5 col-span-12 lg:col-span-6"
        >
          <h2 class="font-bold">{{ title }}</h2>
          <h3 class="font-normal">{{ subtitle }}</h3>
          <CircleProgressBar
            stroke-width="5"
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
        <div
          class="relative col-span-6 bg-gradient-to-r from-orange-50 to-blue-50 hidden lg:inline-block"
        >
          <NuxtImg
            src="/bg-image/exam.png"
            fit="cover"
            height="420"
            class="mt-3 ml-12"
            alt="Hero Bg"
            loading="lazy"
          ></NuxtImg>
        </div>
      </div>
    </UICard>
  </div>
</template>
