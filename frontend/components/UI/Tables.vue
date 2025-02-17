<script setup lang="ts">
const props = defineProps({
  base: String,
  td: {
    type: Object as PropType<TableProps>,
    default: () => ({}),
  },
  th: {
    type: Object as PropType<TableProps>,
    default: () => ({}),
  },
  tr: {
    type: Object as PropType<TableProps>,
    default: () => ({}),
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  hasSelectable: {
    type: Boolean,
    default: false,
  },
  hasBorder: {
    type: Boolean,
    default: false,
  },
  hasPagination: {
    type: Boolean,
    default: true,
  },
  hasPageCount: {
    type: Boolean,
    default: true,
  },
  hasColumnFilter: {
    type: Boolean,
    default: true,
  },
  hasActionHeader: {
    type: Boolean,
    default: true,
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});


const { data,hasSelectable } = toRefs(props);
const {
  search,
  pageCount,
  paginatedData,
  pageFrom,
  pageTo,
  filteredTableData,
  page,
  selectedColumns,
  columnsTable,
  excludeSelectColumn,
  totalPages,
  numberOfRows
} = usePagination(data, props.columns);

const selected = defineModel<any[]>({ default: () => [] });

function select(row: any) {

  const index = selected.value.findIndex(item => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

const tableProps = computed(() => {
  if (hasSelectable.value) {
    return {
      modelValue: selected.value,
      'onUpdate:modelValue': (value:any) => { selected.value = value; },
      select: select,
    };
  } else {
    return {};
  }
});



</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-3 px-4 pt-2" v-if="hasActionHeader">
      <div class="flex items-center gap-2">
        <slot name="action-header"></slot>
      </div>
    </div>
    <!-- Header and Action buttons -->

    <div class="flex justify-between items-center w-full px-2 py-2 flex-col lg:flex-row gap-3 bg-white dark:bg-darken"
      v-if="hasPageCount && hasColumnFilter">
      <div class="flex flex-wrap items-center gap-1.5">
        <!-- <span class="text-sm leading-5">Rows per page:</span> -->
        <USelectMenu v-model="selectedColumns" :options="excludeSelectColumn" v-if="hasColumnFilter" multiple
          class="w-32">
          <UButton icon="i-heroicons-view-columns" class="w-32" size="xs" color="gray">
            Columns
          </UButton>
        </USelectMenu>
        <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" color="gray" placeholder="Search..."
          size="xs" />
        <USelect v-model.number="pageCount" :options="numberOfRows" class="me-2" size="xs" color="gray"
          v-if="hasPageCount" />
      </div>
      <div class="flex gap-1.5 items-center">
        <slot name="action"></slot>
      </div>
    </div>

    <UTable v-bind="tableProps" :loading="isLoading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }" :rows="hasPagination ? paginatedData : data"
      :columns="columnsTable" class="w-full text-xs" :ui="{
        base: base || 'border-t dark:border-gray-700 ',
        thead: 'static',
        wrapper: 'static',
        td: {
          padding: td.padding || 'px-4 py-2',
          base: td.base || '',
          color: 'dark:text-gray-300',
        },
        tr: {
          base:
            tr.base ||
            ' odd:bg-white even:bg-slate-50 dark:odd:bg-gray-900 dark:even:bg-gray-800  ',
        },
        th: {
          padding: th.padding || 'py-2',
          base: th.base || 'w-25 bg-gray-100 dark:bg-darken dark:text-slate-400 text-xs ',
        },
      }">
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <svg-icon name="seticons/emptybox" width="64" height="64" />
          <span class="italic text-sm">Oops, nothing here!</span>
        </div>
      </template>
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </UTable>

    <div v-if="hasPagination"
      class="flex flex-wrap justify-between items-center border-t dark:border-gray-700 px-3 py-1 outline-none dark:bg-darken">
      <div>
        <span class="text-sm leading-5">
          Showing
          <span class="font-medium">{{ pageFrom }}</span>
          to
          <span class="font-medium">{{ pageTo }}</span>
          of
          <span class="font-medium">{{ filteredTableData.length }}</span>
          results
        </span>
      </div>
      <UPagination v-model="page" :max="5" :page-count="1" :total="totalPages" :ui="{
        wrapper: 'flex items-center gap-1 py-1',
        rounded: '!rounded-full min-w-[32px] justify-center',
        default: {
          activeButton: {
            variant: 'outline',
          },
        },
      }" />
    </div>
  </div>
</template>
