<template>
  <UITables
    :data="props.questionData"
    :columns="columns"
    :has-border="true"
    :has-column-filter="false"
    :hasActionHeader="false"
    :has-pagination="false"
    :has-page-count="false"
    :td="{
      base: 'border dark:border-gray-700 align-top',
      padding: 'p-0',
    }"
  >
    <template #question_id-data="{ row, index }">
      <div class="font-bold text-gray-800 dark:text-gray-100 p-5">
        {{ index + 1 }}
      </div>
    </template>

    <template #question-data="{ row, index }">
      <div class="w-full h-full p-5 text-wrap">
        <p class="text-gray-800 dark:text-gray-100" v-html="row.question"></p>
        <ol class="mt-2 flex flex-col gap-2 px-2">
          <li v-for="(val, index) in row.choicesList" :key="row.choices_id">
            <div
              v-if="val.status"
              class="flex justify-between items-stretch py-1 px-2 mx-2 bg-emerald-500 text-white rounded-lg shadow-md"
            >
              <div v-html="val.description"></div>

              <div class="flex gap-1">
                <i-iconoir-star-solid
                  class="text-neon-carrot-300"
                  v-if="val.answersList.length > 0"
                />
                <i-material-symbols-check-rounded />
              </div>
            </div>
            <div
              v-else
              class="flex justify-between items-stretch py-1 px-2 mx-2 bg-carnation-500 opacity-70 text-white rounded-lg shadow-md"
            >
              <div v-html="val.description"></div>
              <div class="flex gap-1">
                <i-iconoir-star-solid
                  class="text-neon-carrot-300"
                  v-if="val.answersList.length > 0"
                />
                <i-bx-x />
              </div>
            </div>
          </li>
        </ol>
      </div>
    </template>
  </UITables>
</template>

<script lang="ts" setup>
const columns = [
  {
    key: "question_id",
    label: "#",
    sortable: true,
    rowClass: "w-10",
  },
  {
    key: "question",
    label: "Question",
    sortable: true,
  },
];

const props = defineProps({
  questionData: {
    type: Object as PropType<ConsoQuestionDetails[]>,
    required: true,
    default: () => [],
  },
});
</script>
<style scoped>
ol {
  list-style-type: upper-alpha;
}
</style>
