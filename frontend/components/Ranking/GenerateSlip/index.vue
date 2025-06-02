<script lang="ts" setup>
const columns = [
  {
    key: "fullname",
    label: "Examinee Name",
    sortable: true,
  },
  {
    key: "score",
    label: "Score",
    sortable: true,
  },
  {
    key: "course",
    label: "Course",
    sortable: false,
  },
  {
    key: "consideration",
    label: "Consideration",
    sortable: false,
    class: "w-2",
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



const { data: courseData } = await useAPI<CourseModel[]>("/course");
const { $toast } = useNuxtApp();
const oicValue = ref("MARIANNE DAPHNE B. VILLAHERMOSA");
const selectedRows = ref<Record<number, boolean>>({});

const print = (data: GenerateSlip[]) => {
  const hasEmptyCourse = data.some((item) => !item.course || item.course.trim() === "");

  if (hasEmptyCourse) {
    $toast.error("One or more examinees have no course selected");
    return;
  }

  printBulkSlip(data, oicValue.value);
};



const filterCourse = (score: number) => {
  return courseData.value
    ?.filter((item) => item.score <= score)
    .map((item) => item.description.toUpperCase());
};
const getCourseOptions = (index: number, score: number) => {
  if (selectedRows.value[index]) {
    return courseData.value?.map((item) => item.description.toUpperCase()) ?? [];
  }
  return filterCourse(score);
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

      <UButton icon="fluent:print-16-regular" @click="print(data)" color="gray" size="md" :ui="BTN_PRINT_DATA">
        PRINT SCORE SLIP
      </UButton>
    </template>

    <template #fullname-data="{ row, index }">
      <span class="capitalize">{{ row.fullname }}</span>
    </template>
    <template #score-data="{ row, index }">
      <span class="capitalize">{{ row.score }}</span>
    </template>
    <template #course-data="{ row, index }">
      <div class="w-[550px]">
        <USelect size="sm" v-model="row.course" :options="getCourseOptions(index, row.score)" />
      </div>

    </template>
    <template #consideration-data="{ row, index }">
      <UCheckbox v-model="selectedRows[index]" />
    </template>
  </UITables>
</template>
