<script lang="ts" setup>
const columns = [
  {
    key: "increment",
    label: "#",
    sortable: true,
  },
  {
    key: "examineeName",
    label: "Examinee Name",
    sortable: true,
  },
  {
    key: "score",
    label: "Score",
    sortable: true,
  },
  {
    key: "ratings",
    label: "Ratings",
    sortable: false,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];
defineProps({
  data: {
    type: Object as PropType<AllResults[]>,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const concatName = (fname: string, lname: string, mname: string) => {
  const mnames = mname ? mname[0] : "";
  return `${lname}, ${fname} ${mnames}.`;
};
</script>

<template>
  <UICard
    :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }"
    :header="{ padding: 'p-3' }"
    :body="{ padding: 'sm:p-0 p-0' }"
    :has-action-header="false"
  >
    <template #header>
      <div class="flex justify-between items-center p-0">
        <h1 class="text-2xl font-semibold">Examinee Record</h1>
      </div>
    </template>
    <template #default>
      <UITables :is-loading="isLoading" :data="data" :columns="columns">
        <template #increment-data="{ row, index }">
          {{ index + 1 }}
        </template>
        <template #examineeName-data="{ row, index }">
          <span class="capitalize">{{
            concatName(row.first_name, row.last_name, row.middle_name)
          }}</span>
        </template>
        <template #score-data="{ row, index }">
          {{ row.totalCorrect }}/{{ row.totalQuestions }}
        </template>
        <template #ratings-data="{ row, index }">
          <UProgress
            :value="row.successRate"
            size="xl"
            :color="row.color"
            indicator
            class="relative"
          >
            <template #indicator="{ percent }">
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xs lg:text-sm"
                :class="percent < 20 ? 'text-secondaryColor-950' : 'text-white'"
              >
                {{ parseFloat(percent).toFixed(2) }}%
              </div>
            </template>
          </UProgress>
        </template>
        <template #actions-data="{ row, index }">
          <div class="flex gap-1">
            <UButton
              :to="{
                name: 'admin-rankings-record-examineeId',
                params: { examineeId: row.examinee_id },
              }"
              color="primary"
              class="dark:text-white"
              variant="solid"
              size="xs"
            >
              <i-bx-show />
            </UButton>
          </div>
        </template>
      </UITables>
    </template>
  </UICard>
</template>
