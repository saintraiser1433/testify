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

const { params } = useRoute();
const { $api, $toast } = useNuxtApp();
const store = useStore();
store.setModuleTitle("EXAMINEE RECORD");
store.setLink(RECORD_BREADCRUMBS);

const statuses = computed(() => status.value === "pending");
const repo = repository($api);
const { data, status, error } = await useAsyncData(
  "ranks",
  async () => {
    const [course, summary] = await Promise.all([
      repo.getAllCourses(),
      repo.getSummaryResultById(params.examineeId.toString()),
    ]);
    return {
      course,
      summary,
    };
  },
  {
    server: false,
  }
);

if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

const { summaryData, examineeName, courseData, summaryScores } = useExamineeSummary(
  data.value?.summary,
  data.value?.course
);
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 lg:col-span-4">
      <Suspense>
        <template #default>
          <RankingRecordInformation
            :data="summaryData"
            :correct-answer="summaryScores.correctAnswers"
            :total-question="summaryScores.totalQuestions"
          />
        </template>
        <template #fallback>
          <SkeletonExamineeResult />
        </template>
      </Suspense>
    </div>
    <div class="col-span-12 lg:col-span-8">
      <RankingRecordCourse
        :examinee-name="examineeName"
        :is-loading="statuses"
        :data="courseData"
      />
    </div>
  </div>
</template>
