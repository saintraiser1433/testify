<script lang="ts" setup>
const columns = [
  {
    key: "increment",
    label: "#",
    sortable: true,
  },
  {
    key: "exam_title",
    label: "Exam Name",
    sortable: true,
  },
  {
    key: "questions",
    label: "Questions",
    sortable: true,
  },
  {
    key: "total",
    label: "Total",
    sortable: true,
  },
  {
    key: "successRate",
    label: "Success Rate",
    sortable: true,
  },
];

defineProps({
  questionsAnalytics: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <UICard
    :body="{ padding: 'sm:p-0 p-0' }"
    :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }"
  >
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

    <UITables
      :has-border="true"
      :is-loading="isLoading"
      :data="questionsAnalytics"
      :columns="columns"
      :td="{
        base: 'border dark:border-gray-700 align-top py-2',
      }"
    >
      <template #increment-data="{ row, index }">
        <span>{{ index + 1 }}</span>
      </template>
      <template #exam_title-data="{ row, index }">
        <span class="uppercase">{{ row.exam_title }}</span>
      </template>
      <template #questions-data="{ row, index }">
        <div v-html="row.questions"></div>
      </template>
      <template #total-data="{ row, index }">
        <span class="capitalize">{{ row.total }}</span>
      </template>
      <template #successRate-data="{ row, index }">
        <span class="capitalize">{{ row.successRate.value }} %</span>
      </template>
    </UITables>
  </UICard>
</template>
