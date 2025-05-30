<script lang="ts" setup>



const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'description',
    label: 'Course Name',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]
defineProps({
    data: {
        type: Object as PropType<CourseModel[]>,
        required: true,
        default: () => [],
    },
    examineeName: {
        type: String,
        required: true,
        default: '',
    },
    isLoading: {
        type: Boolean,
        required: true,
        default: true
    }
})

const { $datefns } = useNuxtApp()
const dateNow = computed(() =>
    $datefns.format(new Date(), "MMM d, yyyy")
);

</script>

<template>
 
    <UICard :body="{ padding: 'sm:p-0 p-0' }" :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }" :has-action-header="false">
        <template #header>
            <div class="flex justify-between items-center p-0">
                <h1 class="text-1xl lg:text-2xl font-semibold">Course Recommended</h1>
            </div>
        </template>
        <template #default>
            <UITables :data="data" :columns="columns" :has-action-header="false">
                <template #increment-data="{ row, index }">
                    <span class="font-bold">{{ index + 1 }}</span>
                </template>
                <template #description-data="{ row, index }">
                    <span class="capitalize">{{ row.description.toUpperCase() }}</span>
                </template>
                <template #actions-data="{ row, index }">
                    <div class="flex gap-1">
                        <UButton type="button"
                            @click="printScoreSlip(examineeName.toUpperCase(), row.description.toUpperCase(),dateNow)"
                            color="emerald" class="dark:text-white" variant="solid" size="xs">
                            <i-ion-print width="16" height="16" />
                        </UButton>

                    </div>
                </template>
            </UITables>
        </template>
    </UICard>
</template>
