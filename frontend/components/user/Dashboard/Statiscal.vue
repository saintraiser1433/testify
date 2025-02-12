<template>
  <div class="flex items-center gap-2 px-3 mt-5 border-b pb-3">
    <div class="self-start">
      <p>Legends:</p>
    </div>
    <ul class="flex text-sm items-center gap-5 flex-row flex-wrap">
      <li v-for="map in legends" :key="map.label">
        <UBadge variant="subtle" :color="map.color" size="lg">
          {{ map.label }}
        </UBadge>
      </li>
    </ul>
  </div>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-9">
      <UITables
        :data="data"
        :columns="columns"
        :is-loading="isLoading"
        :has-border="true"
        :has-action-header="true"
        :has-column-filter="true"
        :td="{
          base: 'border dark:border-gray-700 align-top',
        }"
      >
        <template #exam_title-data="{ row, index }">
          <span class="uppercase font-bold">{{ row.exam_title }}</span>
        </template>

        <template #success_rate-data="{ row, index }">
          <UProgress
            :value="row.success_rate"
            size="xl"
            :color="row.color"
            indicator
            class="relative"
          >
            <template #indicator="{ percent }">
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold"
                :class="percent < 50 ? 'text-secondaryColor-950' : 'text-white'"
              >
                {{ parseFloat(percent).toFixed(2) }}%
              </div>
            </template>
          </UProgress>
        </template>
        <template #score-data="{ row, index }">
          <span class="text-carnation-500">{{ row.correctAnswer }} </span>/<span>{{
            row.totalQuestion
          }}</span>
        </template>
      </UITables>
    </div>
    <div class="flex items-center flex-col col-span-12 lg:col-span-3 gap-2 py-3">
      <h1>YOUR RATINGS</h1>
      <CircleProgressBar
        stroke-width="16"
        size="200"
        color-filled="#062d19"
        :color-unfilled="hexColor"
        animation-duration="1s"
        :value="percentage"
        :max="100"
        percentage
        rounded
      >
        <span class="font-bold"> {{ label }}</span>
      </CircleProgressBar>
    </div>
  </div>
</template>

<script lang="ts" setup>
const columns = [
  {
    key: "exam_title",
    label: "Exam Title",
    sortable: false,
  },
  {
    key: "success_rate",
    label: "Percentage",
    sortable: false,
  },
  {
    key: "score",
    label: "Score",
    sortable: false,
  },
];

const legends: LegendModel[] = [
  {
    label: "POOR 50 Below %",
    color: "carnation",
  },
  {
    label: "GOOD 51-69 %",
    color: "primary",
  },
  {
    label: "VERY GOOD 70 - 89%",
    color: "cyan",
  },
  {
    label: "EXCELLENT 90-100 %",
    color: "emerald",
  },
];

const props = defineProps({
  summaryData: {
    type: Object as PropType<SummaryData[]>,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  percentage: {
    type: Number,
    required: true,
  },
  hexColor: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
});

const { summaryData } = toRefs(props);

const data = computed(() => {
  if (!summaryData.value) return [];
  return summaryData.value.map((items) => {
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
</script>
