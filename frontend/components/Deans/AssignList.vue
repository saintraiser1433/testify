<script setup lang="ts">
const assignColumns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'course_name',
    label: 'Course Assigned',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false
}]

const emits = defineEmits<{
    (e: 'delete', deans_id: number, course_id: number): void
}>();


const props = defineProps({
    assignData: {
        type: Array as PropType<AssignDeansModel[]>,
        required: true,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        default: false,
    }

});

const { assignData, isLoading } = toRefs(props);

const handleDelete = (deans_id: number, course_id: number) => {
    emits('delete', deans_id, course_id)
}
</script>

<template>

    <UITables :is-loading="isLoading" :data="assignData" :columns="assignColumns">
        <template #increment-data="{ row, index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #course_name-data="{ row, index }">
            <span class="capitalize">{{ row.course_name }}</span>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="carnation" class="dark:text-white" variant="solid" size="xs"
                    @click="handleDelete(row.deans_id, row.course_id)">
                    <i-bx-x />
                </UButton>
            </div>
        </template>

    </UITables>
</template>

