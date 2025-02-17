<script lang="ts" setup>
const columns = [
  {
    key: "increment",
    label: "#",
    sortable: true,
  },
  {
    key: "department_name",
    label: "Department Name",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

const emits = defineEmits<{
  (e: "update", payload: DepartmentModel): void;
  (e: "delete", id: number): void;
  (e: "toggleModal"): void;
}>();
const props = defineProps({
  departmentData: {
    type: Array as PropType<DepartmentModel[]>,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
});

const { departmentData } = toRefs(props);

const toggleModal = () => {
  emits("toggleModal");
};

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: DepartmentModel) => {
  emits("update", item);
};
</script>

<template>
  <UITables
    :has-action-header="false"
    :isLoading="isLoading"
    :data="departmentData"
    :columns="columns"
  >
    <template #action>
      <UButton
        icon="i-heroicons-plus"
        color="gray"
        size="md"
        @click="toggleModal"
        :ui="BTN_ADD_DATA_MODAL"
      >
        Add Department
      </UButton>
    </template>
    <template #increment-data="{ row, index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #department_name-data="{ row, index }">
      <span class="capitalize">{{ row.department_name }}</span>
    </template>
    <template #status-data="{ row, index }">
      <UBadge
        v-if="row.status"
        class="dark:text-white"
        color="emerald"
        size="sm"
        variant="solid"
      >
        Active</UBadge
      >
      <UBadge v-else color="carnation" class="dark:text-white" size="sm" variant="solid"
        >Inactive
      </UBadge>
    </template>
    <template #actions-data="{ row, index }">
      <div class="flex gap-1">
        <UButton
          color="emerald"
          class="dark:text-white"
          variant="solid"
          size="sm"
          @click="handleUpdate(row)"
        >
          <i-bx-edit />
        </UButton>
        <UButton
          color="carnation"
          class="dark:text-white"
          variant="solid"
          size="sm"
          @click="handleDelete(row.department_id)"
        >
          <i-icon-park-solid-people-delete />
        </UButton>
      </div>
    </template>
  </UITables>
</template>

<style scoped></style>
