<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object as PropType<SummaryResult>,
    required: true,
    default: () => [],
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  totalQuestion: {
    type: Number,
    required: true,
  },
});
const { data } = toRefs(props);

const strand = computed(() => {
  if (data.value?.strand) {
    return data.value.strand === 'Others'
      ? data.value.others
      : data.value.strand;
  }
  return 'NO DATA';
});
</script>

<template>
  <UICard :body="{ padding: 'sm:p-0 p-0' }" :defaults="{ base: ' border-l-2 border-emerald-400 overflow-hidden' }">
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-1xl lg:text-2xl font-semibold">Examinee Information</h1>
        <svg-icon name="seticons/target" title="targeticon" width="64" height="64" />
      </div>
    </template>
    <template #default>
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div class="flex justify-center relative p-5">
          <div class="rounded-full h-32 w-32 inline-block p-1 bg-white shadow-md">
            <svg-icon name="seticons/studentgirl" width="128" height="128"></svg-icon>
          </div>
        </div>

        <div class="grid grid-cols-12 text-sm p-3 capitalize">
          <div class="col-span-4 font-semibold">First Name:</div>
          <div class="col-span-8">{{ data.first_name.toUpperCase() }}</div>
          <div class="col-span-4 font-semibold">Middle Name:</div>
          <div class="col-span-8">{{ data.middle_name.toUpperCase() }}</div>
          <div class="col-span-4 font-semibold">Last Name:</div>
          <div class="col-span-8">{{ data.last_name.toUpperCase() }}</div>
          <div class="col-span-4 font-semibold">Gender:</div>
          <div class="col-span-8">{{ data.gender.toUpperCase() }}</div>
          <div class="col-span-4 font-semibold">From School:</div>
          <div class="col-span-8 capitalize">{{ data.school.toUpperCase() }}</div>
          <div class="col-span-4 font-semibold">Contact:</div>
          <div class="col-span-8">{{ data.contact_number }}</div>
          <div class="col-span-4 font-semibold">Strand/Others:</div>
          <div class="col-span-8">{{ strand }}</div>


        </div>

        <div class="flex flex-col p-3 gap-2">
          <h3 class="font-semibold">SCORE PER CATEGORY</h3>
          <div class="grid grid-cols-12 text-sm items-center" v-for="item in data.examDetails" :key="item.exam_id">
            <div class="col-span-2 font-semibold">
              <UButton :to="{
                name: 'admin-rankings-consolidate-examineeId-examId',
                params: { examineeId: data.examinee_id, examId: item.exam_id },
              }" variant="solid" color="emerald" square size="xs">
                <i-icon-park-outline-search />
              </UButton>
            </div>
            <div class="col-span-8 font-semibold capitalize">{{ item.exam_title }}</div>
            <div class="col-span-1">
              <span class="text-red-500">{{ item.correctAnswers }}</span>/{{ item.totalQuestions }}
            </div>
          </div>
        </div>
        <div class="flex items-center py-5 px-2">
          <h1 class="text-3xl font-bold">
            Score: <span class="text-red-500">{{ correctAnswer }}</span>/{{ totalQuestion }}
          </h1>
        </div>
      </div>
    </template>
  </UICard>
</template>
