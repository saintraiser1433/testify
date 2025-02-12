export const usePagination = (items: any, columns: any) => {
  const search = ref('')
  const page = ref(1)
  const pageCount = ref(10)
  const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
  const pageTo = computed(() => Math.min(page.value * pageCount.value, filteredTableData.value.length))

  const filteredTableData = computed(() => {
    return items.value.filter((item: any) => {
      return Object.values(item).some((val: any) => val.toString().toLowerCase().includes(search.value))
    })
  });

  const paginatedData = computed(() => {
    const start = (page.value - 1) * pageCount.value
    const end = start + pageCount.value
    return filteredTableData.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredTableData.value.length / pageCount.value)
  })

  const numberOfRows = ref([3, 5, 10, 20, 30, 40, 50, 60, 100])

  const selectedColumns = ref(columns)
  const columnsTable = computed(() => columns.filter((column: any) => selectedColumns.value.includes(column)))
  const excludeSelectColumn = computed(() => columns.filter((v: any) => v.key !== 'select'))


  return {
    search,
    pageCount,
    paginatedData,
    pageFrom,
    pageTo,
    filteredTableData,
    page,
    totalPages,
    selectedColumns,
    columnsTable,
    excludeSelectColumn,
    numberOfRows
  }
}
