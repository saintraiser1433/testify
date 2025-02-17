<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
const emits = defineEmits<{
  (e: 'dataCourse', payload: CourseModel): void;
}>();

const { $joi } = useNuxtApp()
const model = defineModel<CourseModel>({ required: true })
const schema = $joi.object({
  description: $joi.string().required().messages({
    "any.required": `Department Name is Required`,
  }),
  score: $joi.number().required().messages({
    "any.required": `Score  is Required`,
  }),
  course_id: $joi.number().optional()
})


const onSubmit = async (event: FormSubmitEvent<CourseModel>) => {
  emits('dataCourse', event.data)
}


</script>

<template>
  <UForm :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Course Name" name="description" required>
      <UInput v-model="model.description" color="gray" :ui="{ base: 'capitalize' }" />
    </UFormGroup>
    <UFormGroup label="Score" name="score" required>
      <UInput type="number" color="gray" v-model.number="model.score" />
    </UFormGroup>
    <UButton type="submit" block color="gray" size="md" :ui="{
      color: {
        gray: {
          solid: 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 text-white hover:dark:bg-primary-600'
        }
      }
    }">
      Submit
    </UButton>

  </UForm>
</template>

