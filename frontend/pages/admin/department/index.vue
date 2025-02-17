<script setup lang="ts">
definePageMeta({
  requiredRole: "admin",
});

useSeoMeta({
  title: "Testify Department Module",
  description: "CRUD for Department",
  ogTitle: "Testify Department Module",
  ogDescription: "CRUD for Department",
});

const { $api, payload, static: stat, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const store = useStore();
store.setModuleTitle("LIST OF DEPARTMENTS");
store.setLink(DEPARTMENT_BREADCRUMBS);

//fetch department

const departmentData = computed(() => department.value || []);
const statuses = computed(() => status.value === "pending");
const { data: department, status, error: errordept } = await useAPI<DepartmentModel[]>(
  "/department",
  {
    server: false,
    getCachedData(key) {
      const data = payload.data[key] || stat.data[key];
      return data;
    },
  }
);

if (errordept.value) {
  $toast.error(errordept.value.message || "Failed to fetch items");
}

//submit department
const initialState = {
  department_id: undefined,
  department_name: "",
  status: false,
};
const departmentForm = reactive<DepartmentModel>({ ...initialState });
const departmentRepo = repository<ApiResponse<DepartmentModel>>($api);
const submitDepartment = async (response: DepartmentModel) => {
  try {
    if (!isUpdate.value) {
      const res = await departmentRepo.addDepartment(response);
      departmentData.value.unshift(res.data as DepartmentModel);
      $toast.success(res.message);
    } else {
      const res = await departmentRepo.updateDepartment(response);
      const index = departmentData.value.findIndex(
        (item) => item.department_id === res.data?.department_id
      );
      departmentData.value[index] = { ...departmentData.value[index], ...res.data };
      $toast.success(res.message);
    }
    isOpen.value = false;
    isUpdate.value = false;
  } catch (error: any) {
    return handleApiError(error);
  }
};

const editDepartment = (response: DepartmentModel) => {
  departmentForm.department_id = response.department_id;
  departmentForm.department_name = response.department_name;
  departmentForm.status = response.status;
  isOpen.value = true;
  isUpdate.value = true;
};

const removeDepartment = (id: number) => {
  setAlert("warning", "Are you sure you want to delete?", "", "Confirm delete").then(
    async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await departmentRepo.removeDepartment(id);
          const index = departmentData.value.findIndex(
            (item) => item.department_id === id
          );
          departmentData.value.splice(index, 1);
          $toast.success(response.message);
        } catch (error: any) {
          return handleApiError(error);
        }
      }
    }
  );
};

/* utils */
const isUpdate = ref(false);
const isOpen = ref(false);
const resetForm = () => {
  Object.assign(departmentForm, initialState);
};

const toggleModal = () => {
  resetForm();
  isOpen.value = true;
  isUpdate.value = false;
};
</script>

<template>
  <!-- <BaseLoader :isLoading="isLoading"></BaseLoader> -->
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-sm' }" prevent-close>
    <UICard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-2xl lg:text-lg font-semibold">Department Information</h1>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isOpen = false" />
        </div>
      </template>
      <DepartmentForm v-model="departmentForm" @data-department="submitDepartment" />
    </UICard>
  </UModal>

  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-5">
      <UICard :has-header="false" :body="{ padding: 'sm:p-0 p-0' }" :defaults="{
        base: 'border-b-2 border-emerald-500 overflow-hidden',
      }">
        <DepartmentList :is-loading="statuses" :department-data="departmentData" @update="editDepartment"
          @delete="removeDepartment" @toggle-modal="toggleModal" />
      </UICard>
    </div>
  </div>
</template>
