<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
  middleware: "check-exam",
});
const { params } = useRoute();
const { handleApiError } = useErrorHandler();
const { $api, payload, static: stat, $toast } = useNuxtApp();
const store = useStore();
store.setModuleTitle("MANAGE QUESTIONS");
store.setLink(EXAM_QUESTION_BREADCRUMBS);

const isUpdate = ref(false);
const questionRepo = repository<ApiResponse<QuestionModel>>($api);
const questionData = computed(() => question.value ?? []);
const shouldRefetch = ref(0);
const statuses = computed(() => status.value === "pending");
const { data: question, status, error } = await useAPI<QuestionModel[]>(
  `/question/${params.id}`,
  {
    watch: [shouldRefetch],
    lazy: true,
    getCachedData(key) {
      const data = payload.data[key] || stat.data[key];
      if (!data) {
        return;
      }
      return data;
    },
  }
);

if (error.value) {
  $toast.error(error.value?.data.message || "An error occurred");
}

/* Question */

const formQuestion = reactive<QuestionModel>({
  question_id: undefined,
  question: "",
  choicesList: [],
});
const submitQuestion = async (data: QuestionModel): Promise<void> => {
  try {
    let response;
    if (!isUpdate.value) {
      response = await questionRepo.addQuestion(data);
      questionData.value.unshift(response.data as QuestionModel);
    } else {
      response = await questionRepo.updateQuestion(data);
      shouldRefetch.value++;
    }

    $toast.success(response.message);
    resetForm();
  } catch (error: any) {
    return handleApiError(error);
  }
};

const editQuestion = (response: QuestionModel) => {
  formQuestion.question_id = response.question_id;
  formQuestion.question = response.question;
  formQuestion.choicesList = response.choicesList;
  isUpdate.value = true;
};

const removeQuestion = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await questionRepo.removeQuestion(id);
          const index = questionData.value.findIndex((item) => item.question_id === id);
          questionData.value.splice(index, 1);
          $toast.success(response.message);
        } catch (error: any) {
          return handleApiError(error);
        }
      }
    }
  );
};

const resetForm = () => {
  formQuestion.question = "";
  formQuestion.choicesList = [];
  formQuestion.question_id = undefined;
  isUpdate.value = false;
};
</script>

<template>
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-12 lg:col-span-4">
      <UICard :header="{ padding: 'sm:p-3' }">
        <template #header>
          <h1 class="text-2xl lg:text-lg font-semibold">Question Form</h1>
        </template>
        <QuestionForm
          @data-quest-choice="submitQuestion"
          v-model="formQuestion"
          :is-update="isUpdate"
          @reset="resetForm"
        />
      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-8">
      <UICard :body="{ padding: 'sm:p-0 p-0' }" :header="{ padding: 'sm:p-3' }">
        <template #header>
          <h1 class="text-2xl lg:text-lg font-semibold">Question List</h1>
        </template>
        <QuestionList
          :is-loading="statuses"
          :question-data="questionData"
          @update="editQuestion"
          @delete="removeQuestion"
        />
      </UICard>
    </div>
  </div>
</template>
