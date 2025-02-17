<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});
useSeoMeta({
  title: "Testify Rankings Module",
  description: "Rankings",
  ogTitle: "Testify Rankings Module",
  ogDescription: "Rankings",
});

const { $toast, $datefns } = useNuxtApp();
const store = useStore();
store.setModuleTitle("RANKINGS");
store.setLink(RANKINGS_BREADCRUMBS);

const statuses = computed(() => status.value === "pending");
const { data, status, error } = await useAPI<AllResults[]>("/results");

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const dataResults = computed(() => {
  return data.value
    ?.map((item) => {
      const totalQuestions = Number(item.totalQuestions) || 0;
      const totalCorrectAnswers = Number(item.totalCorrect) || 0;

      const successRate =
        totalQuestions > 0
          ? parseFloat(((totalCorrectAnswers / totalQuestions) * 100).toFixed(2))
          : 0;
      return {
        ...item,
        examDateTrans: $datefns.format(item.examDate, "MMM d, yyyy"),
        successRate,
        color: setProgressBarColor(successRate),
      };
    })
    .sort((a, b) => b.totalCorrect - a.totalCorrect);
});

const topRankings = computed(() => {
  if (!dataResults.value) return [];

  return dataResults.value
    .slice()
    .sort((a, b) => b.totalCorrect - a.totalCorrect)
    .slice(0, 10);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 lg:col-span-4">
      <Suspense>
        <template #default>
          <RankingTopList :data="topRankings" />
        </template>
        <template #fallback>
          <SkeletonTopList />
        </template>
      </Suspense>
    </div>
    <div class="col-span-12 lg:col-span-8">
      <RankingResultList :is-loading="statuses" :data="dataResults" />
    </div>
  </div>
</template>
