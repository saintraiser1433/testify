<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "Testify Home Page",
  description: "Testify Analytics",
  ogTitle: "Testify Home Page",
  ogDescription: "Testify Analytics",
});
const { $toast } = useNuxtApp();
const store = useStore();
store.setModuleTitle("ANALYTICAL DASHBOARD");
store.setLink(BASE_BREADCRUMB);

const { data, status, error } = await useAPI<DashboardModel>("/dashboard/summary");
if (error.value) {
  $toast.error(error.value?.data.message || "An error occurred while fetching");
}
const regExaminee = computed(() => data.value?.summary.registeredExaminee || 0);
const comExaminee = computed(() => data.value?.summary.completedExaminee || 0);
const totalCourses = computed(() => data.value?.summary.totalCourse || 0);
const totalExams = computed(() => data.value?.summary.totalExams || 0);

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
  >
  </HomeAnalytics>
  <UICard :body="{ padding: 'sm:p-0 p-0' }"  :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
    <template #header>
      <div class="flex justify-between items-center p-0">
        <div class="flex flex-col">
          <h1 class="text-lg lg:text-lg font-semibold">QUESTION PERCENTAGE</h1>
        </div>
        <svg-icon
          name="dashboard-icons/exam"
          title="examineeicon"
          width="32"
          height="32"
        ></svg-icon>
      </div>
    </template>

    <HomeQuestionPercentage :questions-analytics="summaryQuestions" />
  </UICard>
</template>
