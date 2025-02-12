<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
const props = defineProps({
    deansId: {
        type: Number,
        required: true
    },
    deansName: {
        type: String,
        required: true
    },
    courseData: {
        type: Array as PropType<CourseModel[]>,
        required: true

    }
})
const { deansId, courseData, deansName } = toRefs(props)
const { $joi } = useNuxtApp()
const emits = defineEmits<{
    (e: 'dataAssign', payload: AssignDeansModel): void,
    (e: 'reset'): void,
}>()



const courseList = computed(() => {
    return courseData.value.map((item) => ({
        name: item.description,
        value: item.course_id,
    }))
})

const schema = $joi.object({
    course_id: $joi.number().required().messages({
        "any.required": `Course is Required`,
    }),


})

const state = ref<AssignDeansModel>({
    course_id: undefined
})

const onSubmit = async (event: FormSubmitEvent<AssignDeansModel>) => {
    const data = {
        deans_id: deansId.value,
        course_id: state.value.course_id
    }
    emits('dataAssign', data)
    state.value.course_id = 0;
}


</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Deans Name" name="deansName">
            <UInput :model-value="deansName" color="gray" id="deansName" :ui="{ base: 'capitalize' }" disabled />
        </UFormGroup>
        <UFormGroup label="Course Name" name="course_id" required>
            <USelect v-model.number="state.course_id" id="course_id" color="gray" :options="courseList" :ui="{ base: 'capitalize' }"
                option-attribute="name" />
        </UFormGroup>

        <UButton type="submit" block color="gray" size="md" :ui="{
            color: {
                gray: {
                    solid: 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 text-white hover:dark:bg-primary-600'
                }
            }
        }">Submit</UButton>
    </UForm>
</template>

