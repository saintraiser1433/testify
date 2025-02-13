<script lang="ts" setup>
import { useDashboard } from '#imports';

defineProps({
    totalRegister: {
        type: Number,
        required: true,
        default: 0,
    },
    totalCompleted: {
        type: Number,
        required: true,
        default: 0,
    },
    totalExams: {
        type: Number,
        required: true,
        default: 0,
    },
    totalCourses: {
        type: Number,
        required: true,
        default: 0,
    },
})
const { generateOption } = useDashboard();




</script>


<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-3 ">
            <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Registered Examinees</h6>
                        <h1 class="text-primary-500">{{ totalRegister }}</h1>
                    </div>
                    <div class="rounded-full bg-primary-500 relative p-2">
                        <svg-icon name="dashboard-icons/examinee" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="generateOption('#7367f0').option" class="w-full h-full"
                        :auto-resize="true" />
                </div>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-3">
            <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Completed Examinees</h6>
                        <h1 class="text-emerald-500">{{ totalCompleted }}</h1>
                    </div>
                    <div class="rounded-full bg-emerald-500 relative p-2">
                        <svg-icon name="dashboard-icons/group" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="generateOption('#4eda8c').option" class="w-full h-full"
                        :auto-resize="true" />
                </div>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-3">
            <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Total Courses</h6>
                        <h1 class="text-carnation-400">{{ totalCourses }}</h1>
                    </div>
                    <div class="rounded-full bg-carnation-400 relative p-2">
                        <svg-icon name="dashboard-icons/course" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="generateOption('#ff9f43').option" class="w-full h-full"
                        :auto-resize="true" />
                </div>
            </UICard>
        </div>
        <div class="col-span-12 lg:col-span-3">
            <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
                <div class="flex justify-between items-center p-5 font-semibold">
                    <div class="flex flex-col">
                        <h6>Total Exams</h6>
                        <h1 class="text-neon-carrot-400">{{ totalExams }}</h1>
                    </div>
                    <div class="rounded-full bg-neon-carrot-400 relative p-2">
                        <svg-icon name="dashboard-icons/book" title="registered-examinee" width="32" height="32" />
                    </div>
                </div>
                <div class="w-full h-[80px]">
                    <VChart ref="chart" :option="generateOption('#ff6468').option" class="w-full h-full"
                        :auto-resize="true" />
                </div>
            </UICard>
        </div>
    </div>
</template>
