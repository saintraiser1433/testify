<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'



const emits = defineEmits<{
    (e: 'dataQuestChoice', payload: QuestionModel): void;
    (e: 'reset'): void;
}>()
defineProps({
    isUpdate: {
        type: Boolean,
        default: false
    }
})


const { params, meta } = useRoute();
const { $joi } = useNuxtApp()


const model = defineModel<QuestionModel>({ required: true });
const schema = $joi.object({
    question_id: $joi.number().optional(),
    exam_id: $joi.number().optional(),
    question: $joi.string().required().messages({
        "any.required": `Question is Required`,
    }),
    choicesList: $joi.array().min(2).items(
        $joi.object({
            description: $joi.string().required().trim().min(1).messages({
                'string.empty': 'Choice description cannot be empty',
                'any.required': 'Choice description is required',
                'string.min': 'Choice description cannot be empty'
            }),
            choices_id: $joi.number().optional(),
            status: $joi.boolean().optional()
        })
    ).messages({
        'array.min': 'At least 2 choices are required'
    })
})

const examTitle = computed(() => String(meta.examTitle))

const addChoice = () => {
    if (!model.value.choicesList) {
        model.value.choicesList = []
    }
    model.value.choicesList.push({
        description: '',
        status: false
    })
}

const removeChoices = (index: number) => {
    model.value.choicesList = model.value.choicesList?.filter((_, i) => i !== index)
}


const onSubmit = (event: FormSubmitEvent<QuestionModel>) => {
    emits('dataQuestChoice', { ...event.data, exam_id: Number(params.id) })
}

const reset = () => {
    emits('reset')
}
</script>




<template>
    <UForm :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Exam Title" name="exam_title">
            <UInput color="gray" :model-value="examTitle" readonly :ui="{ base: 'uppercase' }" />
        </UFormGroup>
        <UFormGroup label="Enter Question" name="question" required>
            <UITiptapEditor v-model="model.question" color="gray"></UITiptapEditor>
        </UFormGroup>
        <div class="flex mb-2 border-b dark:border-colorBorder pb-2 ">
            <UButton icon="i-heroicons-plus" color="gray" size="md" @click="addChoice" :ui="{
                color: {
                    gray: {
                        solid: 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600'
                    }
                },
                base: 'ml-auto'
            }">
                Add Choices
            </UButton>

        </div>

        <div class="overflow-y-auto max-h-[400px] custom-scrollbar px-1  ">
            <transition-expand group mode="out-in">
                <div v-for="(choice, index) in model.choicesList" :key="choice.choices_id"
                    class="flex flex-col gap-2 mb-5 p-2 rounded-lg border dark:bg-darken dark:border-gray-700 hover:shadow-sm">
                    <div class="flex items-center justify-between border-b dark:border-gray-700 py-2">
                        <div class="flex flex-row items-center gap-x-2">
                            <span>Choice {{ indexToLetter(index) }} :</span>
                            <UCheckbox v-model="choice.status"
                                :aria-label="'Mark choice ' + indexToLetter(index) + ' as correct'" />
                        </div>
                        <UButton icon="i-tabler-trash" color="gray" size="xs" @click="removeChoices(index)"
                            :aria-label="'Remove choice ' + indexToLetter(index)" :ui="{
                                color: {
                                    gray: {
                                        solid: 'bg-carnation-500 text-white hover:bg-carnation-600 dark:bg-carnation-500 dark:hover:bg-carnation-600'
                                    }
                                },
                                base: 'ml-auto'
                            }">

                        </UButton>

                    </div>

                    <UITiptapEditor v-model="choice.description" />
                </div>

            </transition-expand>

            <div class="space-y-2 mt-4">
                <UButton v-if="isUpdate" color="red" variant="outline" @click="reset" block>
                    Reset Form
                </UButton>

                <UButton v-if="model.choicesList?.length ?? 0 > 0" type="submit" color="gray" block :ui="{
                    color: {
                        gray: {
                            solid: 'bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600'
                        }
                    },
                    base: 'ml-auto'
                }">
                    {{ isUpdate ? 'Update Question' : 'Submit Question' }}
                </UButton>
            </div>
        </div>

    </UForm>
</template>

