<script lang="ts" setup>
const { optionForNightingale, optionForBarChart, optionForDataSet } = useDashboard();
const { optionStackedBar } = useStackedBarChart();
const props = defineProps({
  successRateCourse: {
    type: Array as PropType<ChartModel[]>,
    required: true,
  },
  successRateExam: {
    type: Array as PropType<ChartModel[]>,
    required: true,
  },
  registerVsCompleted: {
    type: Array as PropType<DailyRegistrationVsCompletion[]>,
    required: true,
  },
  successRateCourseGender: {
    type: Array as PropType<CourseGender[]>,
    required: true
  }



})

const { successRateCourse, successRateExam, registerVsCompleted, successRateCourseGender } = toRefs(props);
const stackedBarData = optionStackedBar(successRateCourseGender)
const regVsCompleted = optionForDataSet(registerVsCompleted.value ?? [])

const successRatePerCourses = optionForNightingale(successRateCourse.value ?? [])
const percentagePassPerExam = optionForBarChart(successRateExam.value ?? [])

</script>




<template>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12 lg:col-span-8">
      <UICard :body="{ padding: 'sm:p-0' }" :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }"
        :has-action-header="false">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-lg lg:text-lg font-semibold">EXAMINEE'S ANALYTICS</h1>
            </div>

            <svg-icon name="dashboard-icons/exam" title="examineeicon" width="32" height="32"></svg-icon>
          </div>

        </template>
        <div class="w-full h-[400px] relative">
          <VChart ref="chart" :option="regVsCompleted" class="w-full h-full" :auto-resize="true" />
        </div>

      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <UICard :body="{ padding: 'sm:p-0' }" :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-lg lg:text-lg font-semibold">PASSING EXAMINEE BY COURSE</h1>
            </div>
            <svg-icon name="dashboard-icons/percentage" title="examineeicon" width="32" height="32"></svg-icon>
          </div>

        </template>
        <div class="w-full h-[400px] relative">
          <VChart ref="chart" :option="successRatePerCourses" class="w-full h-full" :auto-resize="true" />
        </div>
      </UICard>
    </div>
  </div>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12">
      <UICard :body="{ padding: 'sm:p-0' }" :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-lg lg:text-lg font-semibold">PERCENTAGE PASSED COURSE BY GENDER</h1>
            </div>
            <svg-icon name="dashboard-icons/check" title="examineeicon" width="32" height="32"></svg-icon>
          </div>

        </template>
        <div class="w-full h-[400px] relative">
          <VChart ref="chart" :option="stackedBarData" class="w-full h-full" :auto-resize="true" />
        </div>

      </UICard>
    </div>

  </div>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12">
      <UICard :body="{ padding: 'sm:p-0' }" :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }">
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <h1 class="text-lg lg:text-lg font-semibold">PERCENTAGE PASSED BY EXAM</h1>
            </div>
            <svg-icon name="dashboard-icons/check" title="examineeicon" width="32" height="32"></svg-icon>
          </div>


        </template>
        <div class="w-full h-[400px] relative">
          <VChart ref="chart" :option="percentagePassPerExam.options" class="w-full h-full" :auto-resize="true" />
        </div>

      </UICard>
    </div>

  </div>

</template>
