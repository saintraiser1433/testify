<script setup lang="ts">
definePageMeta({
  requiredRole: 'admin',
});

useSeoMeta({
  title: 'Testify Examinee Module',
  description: 'CRUD for Examinee',
  ogTitle: 'Testify Examinee Module',
  ogDescription: 'CRUD for Examinee',
});

const { $api, payload, static: stat, $toast } = useNuxtApp();
const { handleApiError } = useErrorHandler();
const store = useStore();
store.setModuleTitle('LIST OF EXAMINEES');
store.setLink(EXAMINEE_BREADCRUMBS);
//fetch Examinee

const examineeData = computed(() => data.value || []);
const shouldRefetch = ref(0);
const statuses = computed(() => status.value === 'pending');
const { data, status, error } = await useAPI<User[]>('/examinee', {
  lazy: true,
  getCachedData(key) {
    const data = payload.data[key] || stat.data[key];
    return data;
  },
  watch: [shouldRefetch],
});

if (error.value) {
  $toast.error(error.value.message || 'Failed to fetch items');
}

const transformData = computed(() => {
  return examineeData.value.map((item) => {
    const fullname =
      item.first_name?.toUpperCase() +
      ' ' +
      item.last_name?.toUpperCase() +
      (item.middle_name ? ' ' + item.middle_name[0].toUpperCase() + '.' : '');
    return {
      ...item,
      fullname,
    };
  });
});

//submit examinee
const initialState = {
  id: undefined,
  first_name: '',
  last_name: '',
  middle_name: '',
};
const examineeForm = reactive<User>({ ...initialState });
const examineeRepo = repository<ApiResponse<User>>($api);
const submitExaminee = async (response: User) => {
  try {
    let result: ApiResponse<User>;

    if (!isUpdate.value) {
      // Add new examinee
      result = await examineeRepo.addExaminee(response);
      examineeData.value.unshift(result.data as User);
    } else {
      // Update existing examinee
      result = await examineeRepo.updateExaminee(response);
      const index = examineeData.value.findIndex(
        (item) => item.id === result.data?.id
      );
      examineeData.value[index] = {
        ...examineeData.value[index],
        ...result.data,
      };
    }

    examineeForm.first_name = '';
    examineeForm.last_name = '';
    examineeForm.middle_name = '';

    // Show success message
    $toast.success(result.message);

    // Reset state
    isOpen.value = false;
    isUpdate.value = false;
  } catch (error: any) {
    return handleApiError(error);
  }
};

const editExaminee = (response: User) => {
  examineeForm.id = response.id;
  examineeForm.first_name = response.first_name;
  examineeForm.last_name = response.last_name;
  examineeForm.middle_name = response.middle_name;
  isOpen.value = true;
  isUpdate.value = true;
};

const removeExaminee = (id: string) => {
  setAlert(
    'warning',
    'Are you sure you want to delete?',
    '',
    'Confirm delete'
  ).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await examineeRepo.removeExaminee(id);
        const index = examineeData.value.findIndex((item) => item.id === id);
        examineeData.value.splice(index, 1);
        $toast.success(response.message);
      } catch (error) {
        return handleApiError(error);
      }
    }
  });
};

//utils
const isOpen = ref(false);
const isUpdate = ref(false);

const resetForm = () => {
  Object.assign(examineeForm, initialState);
};
const toggleModal = () => {
  resetForm();
  isOpen.value = true;
  isUpdate.value = false;
};
</script>

<template>
  <!-- modal -->
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 lg:col-span-3">
      <UICard>
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-2xl lg:text-lg font-semibold">
              Examinee Information
            </h1>
          </div>
        </template>
        <ExamineeForm
          v-model="examineeForm"
          :is-update="isUpdate"
          @data-examinee="submitExaminee"
        />
      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-9">
      <!-- body -->
      <UICard
        :has-header="false"
        :body="{ padding: 'sm:p-0 p-0' }"
        :defaults="{
          base: 'border-b-2 border-emerald-500 overflow-hidden',
        }"
      >
        <ExamineeList
          :is-loading="statuses"
          :examinee-data="transformData"
          @toggle-modal="toggleModal"
          @update="editExaminee"
          @delete="removeExaminee"
        >
        </ExamineeList>
      </UICard>
    </div>
  </div>
</template>
