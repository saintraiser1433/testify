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
const {$toast} = useNuxtApp();
const print = (data: GenerateSlip[]) => {

  const hasEmptyCourse = data.some(item => !item.course || item.course.trim() === '');
  
  if (hasEmptyCourse) {
    $toast.error('One or more examinees have no course selected');
    return; 
  }
  
  printBulkSlip(data)
};

</script>

<template>

  <UITables :data="data" :columns="columns">
    <template #action>
      <UButton icon="fluent:print-16-regular" @click="print(data)" color="gray" size="md" :ui="BTN_PRINT_DATA">
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
