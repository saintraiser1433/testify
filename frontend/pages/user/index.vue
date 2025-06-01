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
  const [summaryData, course, rank] = await Promise.all([
    repo.getSummaryResultById(inf.id),
    repo.getAllCourses(),
    repo.getExamineeRankingById(inf.id),
  ]);

  return {
    summaryData,
    course,
    rank,
  };
});

if (errors.value) {
  $toast.error(errors.value.message || "Failed to fetch items");
}

const {
  summaryData,
  courseData,
  summaryScores,
  isFinished,
  examAttempts,
} = useExamineeSummary(data.value?.summaryData, data.value?.course);

const summary = computed(() => {
  if (!summaryData.value) return [];
  return summaryData.value.examDetails.map((items) => {
    const successRate = parseFloat(
      ((items.correctAnswers / items.totalQuestions) * 100).toFixed(2)
    );
    return {
      exam_id: items.exam_id,
      exam_title: items.exam_title,
      success_rate: successRate,
      correctAnswer: items.correctAnswers,
      totalQuestion: items.totalQuestions,
      color: setProgressBarColor(successRate),
    };
  });
});

const averageSuccessRate = computed(() => {
  const exams = summary.value;
  if (exams.length === 0) return 0;

  const totalSuccessRate = exams.reduce((acc, exam) => acc + exam.success_rate, 0);
  const average = totalSuccessRate / exams.length;

  return parseFloat(average.toFixed(2));
});

const firstMiddleName = computed(
  () =>
    `${data.value?.summaryData.first_name} ${
      data.value?.summaryData.middle_name
        ? `${data.value?.summaryData.middle_name[0]}.`
        : ""
    }`
);

const ranking = computed(() =>
  data.value?.rank.rank !== 0 ? `# ${data.value?.rank.rank}` : "UNRANKED"
);

const { percentage, colors, detail, hexColor, description } = usePercentage(
  summaryScores
);
const items = [
  "/news/1.jpg",
  "/news/2.jpg",
  "/news/5.jpg",
  "/news/3.jpg",
  "/news/4.jpg",

  "/news/6.jpg",
  "/news/7.jpg",
  "/news/8.jpg",
];

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 5000);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-5 container mx-auto py-12">
    <div class="col-span-12 lg:col-span-8 md:col-span-6 flex flex-col gap-3">
      <div
        class="relative bg-gradient-to-r from-emerald-600 to-80% to-indigo-400 flex items-center justify-between py-2 px-10 rounded-md h-52 drop-shadow-lg"
      >
        <div class="flex flex-col gap-4 pr-12 flex-1">
          <div class="flex items-center gap-5">
            <div class="bg-white/90 rounded-full p-1 flex items-center">
              <svg-icon name="seticons/studentgirl" width="48" height="48"></svg-icon>
            </div>
            <div class="flex flex-col">
              <h1 class="text-white font-semibold text-2xl lg:text-2xl">
                Hello,
                <span class="uppercase">{{ data?.summaryData.last_name || "" }} </span> !
              </h1>
              <span class="text-white/80 text-lg lg:text-1xl uppercase">
                {{ firstMiddleName }}
              </span>
              <!-- score section -->
            </div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-white/90 font-semibold">
              Score: {{ summaryScores.correctAnswers }}/{{
                summaryScores.totalQuestions
              }}</span
            >
            <span class="text-white/90 font-semibold"> {{ percentage.toFixed(2) }}%</span>
          </div>

          <UProgress
            :value="summaryScores.correctAnswers"
            :max="summaryScores.totalQuestions"
            color="green"
          >
          </UProgress>
          <div
            v-if="isFinished"
            class="text-center font-semibold pb-2 uppercase text-white/90"
          >
            You already taken the exam!
          </div>
          <UButton
            v-else
            :to="{ name: 'user-information' }"
            :ui="{
              base: 'text-center',
              inline: 'inline-block',
              variant: {
                solid: 'dark:bg-white',
              },
            }"
            class="py-2 px-4"
            color="gray"
            variant="solid"
            >TAKE THE EXAM</UButton
          >
        </div>
        <NuxtImg
          src="/bg-image/herobg.png"
          fit="cover"
          height="180"
          class="mb-4 hidden md:flex lg:flex"
          alt="Hero Bg"
          loading="lazy"
        ></NuxtImg>
      </div>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/dashboard" width="32" height="32" />
          <h2 class="font-semibold">Performance Analytics</h2>
        </template>
        <template #body>
          <div class="flex items-center flex-col md:flex-row w-full gap-5">
            <UserDashboardLegend type="fair">
              <template #title> Fair </template>
              <template #description> 50% below </template>
            </UserDashboardLegend>
            <UserDashboardLegend type="good">
              <template #title> Good </template>
              <template #description> 51-69% </template>
            </UserDashboardLegend>
            <UserDashboardLegend type="vg">
              <template #title> Very Good </template>
              <template #description> 70-89% </template>
            </UserDashboardLegend>
            <UserDashboardLegend type="excellent">
              <template #title> Excellent </template>
              <template #description> 90-100% </template>
            </UserDashboardLegend>
          </div>
          <div class="flex flex-col gap-3 mt-5">
            <UserDashboardExamCardList
              v-for="item in summary"
              :key="item.exam_id"
              :title="item.exam_title"
              :correct-answer="item.correctAnswer"
              :total-answer="item.totalQuestion"
              :success-rate="item.success_rate"
              :color="item.color"
            />
          </div>
        </template>
      </UICustomCard>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/course" width="32" height="32" />
          <h2 class="font-semibold">Recommended Courses</h2>
        </template>
        <template #body>
          <div class="flex flex-col gap-3 w-full">
            <UserDashboardCardList
              :has-trailing="true"
              v-for="(item, index) in courseData"
              :increment="index + 1"
              :description="item.description"
            >
              <template #trailing-right
                ><i-simple-icons:discourse class="text-gray-500 dark:text-gray-100"
              /></template>
            </UserDashboardCardList>
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
          <div class="flex flex-col items-center justify-center gap-2">
            <CircleProgressBar
              stroke-width="5"
              size="200"
              color-filled="#062d19"
              :color-unfilled="hexColor"
              animation-duration="1s"
              :value="percentage"
              :max="100"
              rounded
            >
              <h2 class="font-semibold">{{ percentage.toFixed(2) }}%</h2>
              <i-humbleicons:crown
                class="text-gray-500 font-bold"
                width="32"
                height="32"
              />
            </CircleProgressBar>
            <UBadge
              :color="colors as ProgressColor"
              class="py-1 mt-2 px-10 text-lg dark:text-white/90"
              >{{ detail }}</UBadge
            >
            <h4 v-if="description" class="pt-3 font-semibold text-center">
              {{ description }}
            </h4>
          </div>
        </template>
      </UICustomCard>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/stats" width="32" height="32" />
          <h2 class="font-semibold">Quick Stats</h2>
        </template>
        <template #body>
          <div class="flex flex-col gap-3">
            <UserDashboardCardList description="Exam Completed" type="excellent">
              <template #trailing-right> {{ examAttempts }} </template>
            </UserDashboardCardList>
            <UserDashboardCardList description="Average Score" type="vg">
              <template #trailing-right> {{ averageSuccessRate }}% </template>
            </UserDashboardCardList>
            <UserDashboardCardList description="Rank" type="fair">
              <template #trailing-right> {{ ranking }}</template>
            </UserDashboardCardList>
          </div>
        </template>
      </UICustomCard>
      <UICustomCard>
        <template #header>
          <svg-icon name="seticons/bulletin" width="32" height="32" />
          <h2 class="font-semibold">Bulletin Board</h2>
        </template>
        <template #body>
          <UCarousel
            ref="carouselRef"
            v-slot="{ item }"
            :items="items"
            :ui="{ item: 'basis-full' }"
            class="rounded-lg overflow-hidden"
            indicators
          >
            <img :src="item" class="w-full" draggable="false" />
          </UCarousel>
        </template>
      </UICustomCard>
    </div>
  </div>
</template>
