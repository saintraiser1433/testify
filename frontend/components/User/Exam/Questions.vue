<template>
  <UITables
    :data="props.questionData"
    :columns="columns"
    :has-border="true"
    :has-column-filter="false"
    :hasActionHeader="false"
    :has-pagination="false"
    :has-page-count="false"
    class="w-full"
    :td="{
      base: 'border dark:border-gray-700 align-top',
      padding: 'p-0',
    }"
  >
    <template #question_id-data="{ row, index }">
      <div
        class="font-bold text-gray-800 dark:text-gray-100 p-5"
        :id="index + 1 === 1 ? 'init' : ''"
      >
        {{ index + 1 }}
      </div>
    </template>

    <template #question-data="{ row, index }">
      <div
        class="w-full h-full p-5 text-wrap"
        :id="`question-${row.question_id.value}`"
      >
        <h4
          class="font-semibold font-exam text-gray-800 dark:text-gray-100"
          v-html="row.question.value"
        ></h4>
        <div class="grid grid-cols-2 gap-5 mt-5">
          <URadio
            v-for="(method, index) in row.choices"
            :disabled="isRadioDisabled"
            :ui="{
              base: 'cursor-pointer dark:bg-white ',
              background: 'bg-gray-400 dark:bg-white',
            }"
            :name="`question-${row.question_id.value}`"
            @change="handleAnswerChange(row.question_id.value, method.value)"
            :key="method.value"
            v-model="sessionData[row.question_id.value]"
            v-bind="method"
          >
            <template #label="{ label }">
              <h4
                class="text-gray-900 dark:text-gray-100 font-exam"
                v-html="label"
              ></h4>
            </template>
          </URadio>
        </div>
      </div>
    </template>
  </UITables>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
const isRadioDisabled = useState('disabled', () => false);
const columns = [
  {
    key: 'question_id',
    label: '#',
    sortable: true,
    rowClass: 'w-0',
  },
  {
    key: 'question',
    label: 'Question',
    sortable: true,
  },
];
const emits = defineEmits<{
  (e: 'pushAnswer', payload: ExamAnswer): void;
}>();

const props = defineProps({
  questionData: {
    type: Array,
    required: true,
    default: () => [],
  },
  sessionData: {
    type: Object as PropType<Record<number, number>>,
    required: true,
    default: {},
  },
});

const handleAnswerChange = (questionId: number, answerId: number) => {
  emits('pushAnswer', {
    questionId: questionId,
    answerId: answerId,
  });
};
</script>
