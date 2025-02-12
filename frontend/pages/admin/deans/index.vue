<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
  // middleware: ['checkRole'],
});

useSeoMeta({
  title: "Testify Deans Module",
  description: "CRUD for Deans",
  ogTitle: "Testify Deans Module",
  ogDescription: "CRUD for Deans",
});

const { $api, payload, static: stat, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const store = useStore();
store.setModuleTitle("LIST OF DEANS");
store.setLink(DEANS_BREADCRUMBS);
/* Department */
const departmentData = computed(() => department.value || []);
const { data: department, error: errordept } = await useAPI<DepartmentModel[]>(
  "/department",
  {
    getCachedData(key) {
      const data = payload.data[key] || stat.data[key];
      if (!data) {
        return;
      }
      return data;
    },
    server: false,
  }
);
if (errordept.value) {
  $toast.error(errordept.value?.data.message || "An error occurred");
}

const transformDepartment = computed(() => {
  return departmentData.value.map((item) => ({
    name: item.department_name,
    value: item.department_id,
  }));
});

/* Assign Deans */
const isOpenAssign = ref(false);
const shouldAssign = ref(0);
const deansId = ref(0);
const deansName = ref("");
const assignDeansRepo = repository<ApiResponse<AssignDeansInfoData>>($api);
const statusAssign = computed(() => assignStatus.value === "pending");
const { data: assign, status: assignStatus, error: assignError } = await useAsyncData(
  "assign",
  async () => {
    const [assignCourses, filteredCourses] = await Promise.all([
      assignDeansRepo.getAssignDeans(deansId.value),
      assignDeansRepo.getCourseFiltered(),
    ]);
    return {
      assignCourses: assignCourses.map((item) => ({
        deans_id: item.deans_id,
        course_id: item.course_id,
        course_name: item.course?.description ?? "Untitled Course",
      })),
      filteredCourses,
    };
  },
  {
    immediate: false,
    server: false,
    watch: [shouldAssign],
  }
);

if (assignError.value) {
  $toast.error(assignError.value.message || "An error occurred");
}

const toggleAssignDeans = async (deanId: number, name: string) => {
  deansId.value = deanId;
  deansName.value = name;
  isOpenAssign.value = true;
  shouldAssign.value++;
};

const submitAssign = async (data: AssignDeansModel) => {
  try {
    const response = await assignDeansRepo.addAssignCourse(data);
    shouldAssign.value++;
    $toast.success(response.message);
  } catch (err) {
    return handleApiError(err);
  }
};

const removeAssign = async (deansId: number, courseId: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await assignDeansRepo.removeAssignCourse(deansId, courseId);
          shouldAssign.value++;
          $toast.success(response.message);
        } catch (error: any) {
          return handleApiError(error);
        }
      }
    }
  );
};

/* Deans */
const deansRepo = repository<ApiResponse<DeansModel>>($api);
const deansData = computed(() => data.value || []);
const statusDean = computed(() => status.value === "pending");
const { data, status, error } = await useAPI<DeansModel[]>("/deans", {
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key];
    if (!data) {
      return;
    }
    return data;
  },
});
if (error.value) {
  $toast.error(error.value.message || "An error occurred");
}

const transformDeans = computed(() => {
  return deansData.value.map((item) => {
    const fullname =
      item.first_name +
      " " +
      item.last_name +
      (item.middle_name ? " " + item.middle_name[0] + "." : "");
    const dept = departmentData.value.find(
      (items) => items.department_id === item.department_id
    );
    return {
      deans_id: item.deans_id,
      first_name: item.first_name,
      last_name: item.last_name,
      middle_name: item.middle_name,
      status: item.status,
      department_id: item.department_id,
      department_name: dept?.department_name,
      username: item.username,
      fullname,
    };
  });
});

//submittion of deans and update
const initialState = {
  deans_id: undefined,
  first_name: "",
  last_name: "",
  middle_name: "",
  department_id: 0,
  username: undefined,
  password: undefined,
  status: false,
};
const deansForm = reactive<DeansModel>({ ...initialState });
const submitDeans = async (response: DeansModel) => {
  try {
    if (!isUpdate.value) {
      const res = await deansRepo.addDeans(response);
      deansData.value.unshift(res.data as DeansModel);
      $toast.success(res.message);
    } else {
      const res = await deansRepo.updateDeans(response);
      const index = deansData.value.findIndex(
        (item) => item.deans_id === res.data?.deans_id
      );
      deansData.value[index] = { ...deansData.value[index], ...res.data };
      $toast.success(res.message);
    }
    isOpen.value = false;
    isUpdate.value = false;
  } catch (error: any) {
    return handleApiError(error);
  }
};

const editDeans = (response: DeansModel) => {
  deansForm.deans_id = response.deans_id;
  deansForm.first_name = response.first_name;
  deansForm.last_name = response.last_name;
  deansForm.middle_name = response.middle_name;
  deansForm.department_id = response.department_id;
  deansForm.status = response.status;
  isOpen.value = true;
  isUpdate.value = true;
};

//utils
const isUpdate = ref(false);
const isOpen = ref(false);
const resetForm = () => {
  Object.assign(deansForm, initialState);
};

const toggleModal = () => {
  resetForm();
  isOpen.value = true;
  isUpdate.value = false;
};
</script>

<template>
  <UModal :ui="{ width: 'w-full lg:max-w-[1400px]' }" v-model="isOpenAssign" prevent-close>
    <UICard :body="{ padding: 'p-4', base: 'dark:bg-dark-body-950' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl lg:text-lg font-semibold">Assign Deans</h1>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isOpenAssign = false" />
        </div>
      </template>
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 lg:col-span-3">
          <UICard :body="{ padding: 'px-4' }">
            <template #header>
              <h1 class="text-2xl lg:text-lg font-semibold">Courses Assign</h1>
            </template>
            <DeansAssignForm :deans-name="deansName" :course-data="assign?.filteredCourses ?? []" :deans-id="deansId"
              @data-assign="submitAssign" />
          </UICard>
        </div>
        <div class="col-span-12 lg:col-span-9">
          <UICard>
            <template #header>
              <h1 class="text-2xl lg:text-lg font-semibold">List of Courses Assign</h1>
            </template>
            <DeansAssignList :is-loading="statusAssign" :assign-data="assign?.assignCourses ?? []"
              @delete="removeAssign" />
          </UICard>
        </div>
      </div>
    </UICard>
    <!-- </UCard> -->
  </UModal>

  <!-- deans index -->
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-sm' }" prevent-close>
    <UICard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl lg:text-lg font-semibold">Deans Information</h1>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isOpen = false" />
        </div>
      </template>
      <DeansForm v-model="deansForm" :department-data="transformDepartment" :is-update="isUpdate"
        @data-deans="submitDeans">
      </DeansForm>
    </UICard>
  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5">
      <UICard :has-header="false" :body="{ padding: 'sm:p-0' }" :defaults="{
        base: 'border-b-2 border-emerald-500 overflow-hidden',
      }">
        <DeansList :is-loading="statusDean" :deans-data="transformDeans" @toggle-modal="toggleModal"
          @assign="toggleAssignDeans" @update="editDeans" />
      </UICard>
    </div>
  </div>

  <!-- end -->
</template>
