<script setup lang="ts">
const columns = [
  {
    key: "increment",
    label: "#",
    sortable: true,
  },
  {
    key: "fullname",
    label: "Deans Name",
    sortable: true,
  },
  {
    key: "department_name",
    label: "Department",
    sortable: true,
  },
  {
    key: "username",
    label: "Username",
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
  (e: "update", payload: DeansModel): void;
  (e: "delete", id: number): void;
  (e: "assign", id: number, fullname: string): void;
  (e: "toggleModal"): void;
}>();
const props = defineProps({
  deansData: {
    type: Array as PropType<DeansModel[]>,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { deansData, isLoading } = toRefs(props);

const assignDeans = (id: number, fullname: string) => {
  emits("assign", id, fullname);
};
const toggleModal = () => {
  emits("toggleModal");
};

const handleUpdate = (item: DeansModel) => {
  emits("update", item);
};
</script>

<template>
  <UITables :has-action-header="false" :is-loading="isLoading" :data="deansData" :columns="columns">
    <template #action>
      <UButton
        icon="i-heroicons-plus"
        color="gray"
        size="md"
        @click="toggleModal"
        :ui="BTN_ADD_DATA_MODAL"
      >
        Add Deans's
      </UButton>
    </template>

    <template #increment-data="{ row, index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #fullname-data="{ row, index }">
      <span class="capitalize">{{ row.fullname }}</span>
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
          color="primary"
          class="dark:text-white"
          variant="solid"
          size="xs"
          @click="assignDeans(row.deans_id, row.fullname)"
        >
          <i-bx-show />
        </UButton>
        <UButton
          color="emerald"
          class="dark:text-white"
          variant="solid"
          size="xs"
          @click="handleUpdate(row)"
        >
          <i-bx-edit />
        </UButton>
      </div>
    </template>
  </UITables>
</template>
