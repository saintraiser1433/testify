<script setup lang="ts">
definePageMeta({
  requiredRole: "examinee",
  layout: "user",
});

useSeoMeta({
  title: "Testify User Home Page",
  description: "This is signup page",
  ogTitle: "Testify User Home Page",
  ogDescription: "This is signup page",
});

const { info } = useAuthentication();
const { $api, $toast } = useNuxtApp();
const inf = JSON.parse(info.value);

const repo = repository($api);
const { data, status: statuses, error: errors } = await useAsyncData("key", async () => {
  const [summaryData, course] = await Promise.all([
    repo.getSummaryResultById(inf.id),
    repo.getAllCourses(),
  ]);

  return {
    summaryData,
    course,
  };
});

if (errors.value) {
  $toast.error(errors.value.message || "Failed to fetch items");
}

const {
  summaryData,
  courseData,
  summaryScores,
  examineeName,
  isFinished,
  examAttempts,
} = useExamineeSummary(data.value?.summaryData, data.value?.course);

const { percentage, hexColor, detail } = usePercentage(summaryScores);
</script>

<template>
  <div class="grid grid-cols-12 gap-5 container mx-auto py-12">
    <div class="col-span-12 lg:col-span-8 md:col-span-6 flex flex-col gap-3">
      <div
        class="relative bg-gradient-to-r from-emerald-600 to-80% to-indigo-400 flex items-center justify-between py-2 px-10 rounded-md h-48 drop-shadow-lg">
        <div class="flex items-center gap-5">
          <div class="bg-white/90 rounded-full p-1 flex items-center">
            <svg-icon name="seticons/studentgirl" width="100" height="100"></svg-icon>
          </div>
          <div class="flex flex-col gap-3">
            <h1 class="text-white font-semibold text-2xl lg:text-3xl ">Hello, Favilla !</h1>
            <span class="text-white/90  text-lg lg:text-2xl ">RHEKEEN MHEZZAR U.</span>
            <!-- score section -->
            <div class="flex items-center gap-2">
              <i-humbleicons:crown class="text-white font-bold" width="32" height="32" />
              <span class="text-white/90  text-2xl lg:text-2xl font-semibold">69/72</span>
              <UButton color="emerald" class="ml-2 px-5" :ui="{ rounded: 'rounded-full' }">Excellent</UButton>
            </div>
            <!-- end score -->
          </div>
        </div>
        <NuxtImg src="/bg-image/herobg.png" fit="cover" height="180" class="mb-4 hidden md:flex lg:flex" alt="Hero Bg"
          loading="lazy"></NuxtImg>

      </div>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/dashboard" width="32" height="32" />
          <h2 class="font-semibold">Performance Analytics</h2>
        </template>
        <template #body>
          <UILegend type="fair">
            <template #title>
              Fair
            </template>
            <template #description>
              50% below
            </template>
          </UILegend>
          <UILegend type="good">
            <template #title>
              Good
            </template>
            <template #description>
              51-69%
            </template>
          </UILegend>
          <UILegend type="vg">
            <template #title>
              Very Good
            </template>
            <template #description>
              70-89%
            </template>
          </UILegend>
          <UILegend type="excellent">
            <template #title>
              Excellent
            </template>
            <template #description>
              90-100%
            </template>
          </UILegend>

        </template>
      </UICustomCard>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/course" width="32" height="32" />
          <h2 class="font-semibold">Recommended Courses</h2>
        </template>
        <template #body>
          <div class="flex items-center p-2 bg-gray/50">
            asdasda
          </div>
        </template>
      </UICustomCard>
    </div>
    <div class="col-span-12 lg:col-span-4 md:col-span-6 flex flex-col gap-3">
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/star" width="32" height="32" />
          <h2 class="font-semibold">Your Rating</h2>
        </template>
        <template #body>

        </template>
      </UICustomCard>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/stats" width="32" height="32" />
          <h2 class="font-semibold">Quick Stats</h2>
        </template>
        <template #body>

        </template>
      </UICustomCard>

    </div>

  </div>
</template>
