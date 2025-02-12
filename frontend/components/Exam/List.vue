<script lang="ts" setup>
const columns = [
  {
    key: "increment",
    label: "#",
    sortable: true,
  },

  {
    key: "exam_title",
    label: "Exam Name",
    sortable: true,
  },
  {
    key: "description",
    label: "Description",
    sortable: true,
  },
  {
    key: "time_limit",
    label: "Time",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },

];

const emits = defineEmits<{
  (e: "update", payload: ExamModel): void;
  (e: "delete", id: number): void;
  (e: "assign", id: number): void;
  (e: "toggleModal"): void;
}>();
const props = defineProps({
  examData: {
    type: Array as PropType<ExamModel[]>,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { examData, isLoading } = toRefs(props);

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const toggleModal = () => {
  emits("toggleModal");
};

const handleDelete = (id: number) => {
  emits("delete", id);
};

const handleUpdate = (item: ExamModel) => {
  emits("update", item);
};


</script>

<template>
  <UITables :has-action-header="false" :is-loading="isLoading" :data="examData" :columns="columns">
    <template #action>
      <UButton icon="i-heroicons-plus" color="gray" size="md" @click="toggleModal" :ui="BTN_ADD_DATA_MODAL">
        Add Exam
      </UButton>
    </template>
    <template #increment-data="{ row, index }">
      <span>{{ index + 1 }}</span>
    </template>
    <template #exam_title-data="{ row, index }">
      <span class="uppercase">{{ row.exam_title }}</span>
    </template>
    <template #description-data="{ row, index }">
      <span class="capitalize">{{ row.description }}</span>
    </template>
    <template #time_limit-data="{ row, index }">
      <span class="capitalize">{{ formatTime(row.time_limit) }}</span>
    </template>
    <template #actions-data="{ row, index }">
      <div class="flex gap-1">
        <UButton :to="{ name: 'admin-exam-id', params: { id: row.exam_id } }" color="primary" class="dark:text-white"
          variant="solid" size="xs">
          <i-bx-show />
        </UButton>
        <UButton color="emerald" class="dark:text-white" variant="solid" size="xs" @click="handleUpdate(row)">
          <i-bx-edit />
        </UButton>
        <UButton color="carnation" class="dark:text-white" variant="solid" size="xs" @click="handleDelete(row.exam_id)">
          <i-icon-park-solid-people-delete />
        </UButton>
      </div>
    </template>
  </UITables>
</template>

<style scoped></style>
