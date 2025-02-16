<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "Testify Course Module",
  description: "CRUD for course",
  ogTitle: "Testify course Module",
  ogDescription: "CRUD for course",
});

const { $api, payload, static: stat, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const store = useStore();
store.setModuleTitle("LIST OF COURSES");
store.setLink(COURSE_BREADCRUMBS);

const isUpdate = ref(false);
const isOpen = ref(false);

/* fetch course */
const courseData = computed(() => data.value || []);
const statuses = computed(() => status.value === "pending");
const { data, status, error } = await useAPI<CourseModel[]>("/course", {
  server: false,
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key];
    if (!data) {
      return;
    }
    return data;
  },
});
if (error.value) {
  $toast.error(error.value.message || "Failed to fetch items");
}

//submit course
const initialState = {
  course_id: undefined,
  description: "",
  score: 0,
};
const courseForm = reactive<CourseModel>({ ...initialState });
const courseRepo = repository<ApiResponse<CourseModel>>($api);

const submitCourse = async (response: CourseModel) => {
  try {
    if (!isUpdate.value) {
      const res = await courseRepo.addCourse(response);
      courseData.value.unshift(res.data as CourseModel);
      $toast.success(res.message);
    } else {
      const res = await courseRepo.updateCourse(response);
      const index = courseData.value.findIndex(
        (item) => item.course_id === res.data?.course_id
      );
      courseData.value[index] = { ...courseData.value[index], ...res.data };
      $toast.success(res.message);
    }
    isOpen.value = false;
    isUpdate.value = false;
  } catch (error: any) {
    return handleApiError(error);
  }
};

const editCourse = (response: CourseModel) => {
  courseForm.course_id = response.course_id;
  courseForm.description = response.description;
  courseForm.score = response.score;
  isOpen.value = true;
  isUpdate.value = true;
};

const removeCourse = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await courseRepo.removeCourse(id);
          const index = courseData.value.findIndex((item) => item.course_id === id);
          courseData.value.splice(index, 1);
          $toast.success(response.message);
        } catch (error: any) {
          return handleApiError(error);
        }
      }
    }
  );
};

//utils
const resetForm = () => {
  Object.assign(courseForm, initialState);
};

const toggleModal = () => {
  resetForm();
  isOpen.value = true;
  isUpdate.value = false;
};
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-sm' }" prevent-close>
    <UICard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl lg:text-lg font-semibold">Course Information</h1>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <CourseForm v-model="courseForm" @data-course="submitCourse" />
    </UICard>
  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5">
      <UICard
        :has-header="false"
        :body="{ padding: 'sm:p-0 p-0' }"
        :defaults="{
          base: 'border-b-2 border-emerald-500 overflow-hidden',
        }"
      >
        <CourseList
          :is-loading="statuses"
          :course-data="courseData"
          @update="editCourse"
          @delete="removeCourse"
          @toggleModal="toggleModal"
        />
      </UICard>
    </div>
  </div>
</template>
