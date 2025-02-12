<script lang="ts" setup>
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "Testify User Exam",
  description: "This is an examination page",
  ogTitle: "Testify User Exam",
  ogDescription: "This is an examination page",
});

const { params } = useRoute();
const { $toast } = useNuxtApp();
const store = useStore();
store.setModuleTitle("CONSOLIDATE ANSWERS");
store.setLink(CONSOLIDATE_BREADCRUMBS);

//top level
const { data: summary, status, error } = await useAPI<ConsoSummary>(
  `/answer/consolidate/${params.examineeId}/${params.examId}`
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const questionsData = computed(() => summary.value?.data || []);
const examTitle = computed(() =>
  questionsData.value
    ? `Exam Title: ${questionsData.value[0].examList.exam_title}`
    : "Unknown Exam"
);

const summaryScores = computed(() => {
  const totalQuestions = summary.value?.summaryScore[0].totalQuestions || 0;
  const totalCorrect = summary.value?.summaryScore[0].correctAnswers || 0;

  return {
    totalQuestions,
    totalCorrect,
  };
});
</script>

<template>
  <div>
    <UICard
      :body="{
        padding: 'sm:p-0 p-0',
        base: 'h-[73vh] lg:h-[76vh] w-full overflow-y-auto',
      }"
      :header="{ padding: 'sm:p-0 p-0' }"
      :footer="{
        base: 'flex justify-center items-center py-2 dark:bg-darken',
      }"
    >
      <template #header>
        <UserDashboardHeader :title="examTitle">
          <h1 class="text-white font-bold">
            SCORE: {{ summaryScores.totalCorrect }}/{{ summaryScores.totalQuestions }}
          </h1>
        </UserDashboardHeader>
      </template>
      <template #default>
        <RankingConsolidateAnswers :question-data="questionsData" />
      </template>
    </UICard>
  </div>
</template>
