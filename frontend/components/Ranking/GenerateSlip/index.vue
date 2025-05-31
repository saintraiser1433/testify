<script lang="ts" setup>
const columns = [
  {
    key: "fullname",
    label: "Examinee Name",
    sortable: true,
  },
  {
    key: "course",
    label: "Course",
    sortable: false,
  },
];
const props = defineProps({
  data: {
    type: Object as PropType<GenerateSlip[]>,
    required: true,
    default: () => [],
  },
});
const { data } = toRefs(props);

const filterCourse = (score: number) => {
  return courseData.value
    ?.filter((item) => item.score <= score)
    .map((item) => item.description.toUpperCase());
};

const { data: courseData } = await useAPI<CourseModel[]>("/course");
const { $toast } = useNuxtApp();
const oicValue = ref("MARIANNE DAPHNE B. VILLAHERMOSA");
const print = (data: GenerateSlip[]) => {
  const hasEmptyCourse = data.some((item) => !item.course || item.course.trim() === "");

  if (hasEmptyCourse) {
    $toast.error("One or more examinees have no course selected");
    return;
  }

  printBulkSlip(data, oicValue.value);
};

const oic = [
  {
    name: "SOPHIA ANNE P. ARIAS, RPM",
    value: "SOPHIA ANNE P. ARIAS, RPM",
  },
  {
    name: "GLYZA P. LASTICO, MSC, RPM",
    value: "GLYZA P. LASTICO, MSC, RPM",
  },
  {
    name: "MARIANNE DAPHNE B. VILLAHERMOSA",
    value: "MARIANNE DAPHNE B. VILLAHERMOSA",
  },
];
</script>

<template>
  <UITables :data="data" :columns="columns">
    <template #action>
      <div class="flex items-center gap-2">
        <label class="font-semibold">OIC:</label>
        <USelect v-model="oicValue" color="gray" :options="oic" option-attribute="name" />
      </div>

      <UButton
        icon="fluent:print-16-regular"
        @click="print(data)"
        color="gray"
        size="md"
        :ui="BTN_PRINT_DATA"
      >
        PRINT SCORE SLIP
      </UButton>
    </template>

    <template #fullname-data="{ row, index }">
      <span class="capitalize">{{ row.fullname }}</span>
    </template>
    <template #course-data="{ row, index }">
      <USelect v-model="row.course" :options="filterCourse(row.score)" />
    </template>
  </UITables>
</template>
