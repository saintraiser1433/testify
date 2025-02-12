<script setup lang="ts">
const columns = [{
    key: "increment",
    label: '#',
    sortable: true
}, {
    key: 'question',
    label: 'Questions',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: QuestionModel): void;
    (e: 'delete', id: number): void;
}>();

const props = defineProps({
    questionData: {
        type: Array as PropType<QuestionModel[]>,
        required: true,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        default: false,
    }
})

const { isLoading } = toRefs(props)

const handleUpdate = (val: QuestionModel) => {
    emits('update', val)
}
const handleDelete = (id: number) => {
    emits('delete', id)
}

</script>
<template>
    <UITables :is-loading="isLoading" :data="questionData" :hasBorder="true" :columns="columns"
        :has-action-header="false" :td="{
            base: 'border dark:border-gray-700 align-top py-2'
        }">
        <template #increment-data="{ row, index }">
            <span class="font-semibold">{{ index + 1 }}</span>
        </template>
        <template #question-data="{ row, index }">
            <td class="max-w-lg whitespace-normal text-wrap">
                <p class="font-bold mb-2" v-html="row.question"></p>
                <ol >
                    <li :class="{ 'text-success': choices.status }" class="capitalize mx-5 p-2" v-for="(choices, index) in row.choicesList" :key="choices.choices_id">
                        <p v-html="choices.description"></p>
                    </li>
                </ol>


            </td>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="xs" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="xs"
                    @click="handleDelete(row.question_id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>


<style scoped>
ol {
    list-style-type: upper-alpha;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;

}
</style>