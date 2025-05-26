<script lang="ts" setup>
const columns = [{
    key: 'id',
    label: '#',
    sortable: true

}, {
    key: 'fullname',
    label: 'Fullname',
    sortable: true
}, {
    key: 'username',
    label: 'Username',
    sortable: true
}, {
    key: 'password',
    label: 'Password',
    sortable: true
}, {
    key: 'actions',
    label: 'Actions',
    sortable: false

}]


const emits = defineEmits<{
    (e: 'update', payload: User): void,
    (e: 'delete', id: string): void,
    (e: 'toggleModal'): void,
}>()
const props = defineProps({
    examineeData: {
        type: Array as PropType<User[]>,
        required: true,
        default: () => [],
    },
    isLoading: {
        type: Boolean,
        default: false,
    }

})
const selected = ref<User[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const jsonData = ref<string | null>(null);
const visiblePasswords = ref<Set<number>>(new Set());
const { examineeData, isLoading } = toRefs(props)
const { $joi,$xlsx,$password } = useNuxtApp();
const schema = $joi.array().items(
        $joi.object({
        first_name: $joi.string().required().messages({
            "any.required": `First Name is Required`,
        }),
        last_name: $joi.string().required().messages({
            "any.required": `Last Name is Required`,
        }),
        middle_name: $joi.string().required().messages({
            "any.required": `Middle Name is Required`,
        }),
        username: $joi.string().optional(),
        password: $joi.string().optional(),
}))

const toggleModal = () => {
    emits('toggleModal');
}

const handleDelete = (id: string) => {
    emits('delete', id)
}

const handleUpdate = (item: User) => {
    emits('update', item)
}

const togglePassword = (index: number) => {
    if (visiblePasswords.value.has(index)) {
        visiblePasswords.value.delete(index);
    } else {
        visiblePasswords.value.add(index);
    }
}



const isPasswordVisible = (index: number): boolean => {
    return visiblePasswords.value.has(index);
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer)
    const workbook = $xlsx.read(data, { type: 'array' })
    const firstSheet = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheet]
    const json = $xlsx.utils.sheet_to_json(worksheet)
    jsonData.value = JSON.stringify(json, null, 2)



  }

  reader.readAsArrayBuffer(file)
}


const triggerFileInput = () => {
  fileInput.value?.click()
}



</script>

<template>
    <UITables v-model="selected" :has-selectable="true" :has-action-header="false" :is-loading="isLoading"
        :data="examineeData" :columns="columns">
        <template #action>
            <UButton v-if="selected.length > 0" icon="i-flat-color-icons-print" color="gray" size="md"
                @click="printCredentials(selected)" :ui="BTN_PRINT_DATA">
                PRINT
            </UButton>
            <UButton @click="triggerFileInput" icon="pajamas-import" color="gray" size="md"
                 :ui="BTN_IMPORT">
                IMPORT
            </UButton>
            <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xlsx, .xls" class="hidden" />
            <UButton icon="heroicons-plus" color="gray" size="md" @click="toggleModal" :ui="BTN_ADD_DATA_MODAL">
                Add Examinee's
            </UButton>
            <pre v-if="jsonData" class="mt-4 bg-gray-100 p-4 text-sm overflow-auto">
                {{ jsonData }}
                </pre>
        </template>
        <template #id-data="{ row, index }">
            <span>{{ index + 1 }}</span>
        </template>
        <template #fullname-data="{ row, index }">
            <span class="capitalize">{{ row.fullname }}</span>
        </template>
        <template #password-data="{ row, index }">
            <div class="flex items-center gap-3">
                <span v-if="!isPasswordVisible(index)">•••••••••</span>
                <span v-else>{{ row.password }}</span>
                <UButton :icon="isPasswordVisible(index) ? 'i-mdi-hide' : 'i-mdi-show'" variant="soft" color="primary"
                    size="xs" @click="togglePassword(index)" />
            </div>
        </template>
        <template #actions-data="{ row, index }">
            <div class="flex gap-1">
                <UButton color="emerald" class="dark:text-white" variant="solid" size="xs" @click="handleUpdate(row)">
                    <i-bx-edit />
                </UButton>
                <UButton color="carnation" class="dark:text-white" variant="solid" size="xs"
                    @click="handleDelete(row.id)">
                    <i-icon-park-solid-people-delete />
                </UButton>
            </div>
        </template>
    </UITables>
</template>

<style scoped></style>
