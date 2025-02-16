<script setup lang="ts">
import { Fragment } from "vue/jsx-runtime";

definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "Testify Home Page",
  description: "Testify Analytics",
  ogTitle: "Testify Home Page",
  ogDescription: "Testify Analytics",
});
const { $toast, payload, static: stat } = useNuxtApp();
const store = useStore();
store.setModuleTitle("ANALYTICAL DASHBOARD");
store.setLink(BASE_BREADCRUMB);

const { data, status, error } = await useAPI<DashboardModel>("/dashboard/summary", {
  server: false,
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key];
    if (!data) {
      return;
    }
    return data;
  },
});
if (error.value) {
  $toast.error(error.value?.data.message || "An error occurred while fetching");
}
const regExaminee = computed(() => data.value?.summary.registeredExaminee || 0);
const comExaminee = computed(() => data.value?.summary.completedExaminee || 0);
const totalCourses = computed(() => data.value?.summary.totalCourse || 0);
const totalExams = computed(() => data.value?.summary.totalExams || 0);
const isLoading = computed(() => status.value === "pending");
const successRatePerCourses = computed(
  () =>
    data.value?.coursesPassed.map((item) => ({
      name: getAcronym(item.name).toUpperCase(),
      value: item.value,
    })) || []
);

const successRatePerExam = computed(
  () =>
    data.value?.examPassed.map((item) => {
      const totalQuestions = item.totalQuestions;
      const totalExaminee = item.totalExaminee;
      const totalCorrect = item.totalCorrect;

      const totalPercentage = Number(
        ((totalCorrect / (totalExaminee * totalQuestions)) * 100).toFixed(2)
      );
      return {
        name: item.exam_title.toUpperCase(),
        value: totalPercentage,
      };
    }) || []
);
const registerVsExaminee = computed(() => data.value?.dailyRegisterVsCompleted || []);
const summaryQuestions = computed(() =>
  data.value?.summaryQuestions.map((item) => {
    const totalCorrect = item.totalCorrect;
    const totalAttempt = item.totalAttempt;
    const successRate = parseInt(((totalCorrect / totalAttempt) * 100).toFixed(2));

    return {
      exam_title: item.exam_title,
      questions: item.question,
      total: `${item.totalCorrect}/${item.totalAttempt}`,
      successRate: {
        value: successRate,
        class: highlightSuccessRate(successRate),
      },
    };
  }, [])
);
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <HomeSummaryAnalytics
          :total-register="regExaminee"
          :total-completed="comExaminee"
          :total-courses="totalCourses"
          :total-exams="totalExams"
        />
        <HomeAnalytics
          :success-rate-course="successRatePerCourses"
          :success-rate-exam="successRatePerExam"
          :register-vs-completed="registerVsExaminee"
        />
        <HomeQuestionPercentage :questions-analytics="summaryQuestions" />
      </div>
    </template>
    <template #fallback>
      <div>
        <SkeletonSummaryAnalytics />
        <SkeletonAnalytics />
        <SkeletonQuestionPercentage />
      </div>
    </template>
  </Suspense>
</template>
