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
const visiblePasswords = ref<Set<number>>(new Set());
const { examineeData, isLoading } = toRefs(props)
const { $xlsx,$password,$toast,$api } = useNuxtApp();
const { handleApiError } = useErrorHandler();

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

const examineeRepo = repository<ApiResponse<User>>($api);

const handleFileUpload = async (event: Event) => {
  try {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) {
      $toast.error('No file selected');
      return;
    }

    const data = await readExcelFile(file);
    const validatedData = await validateExamineeData(data);
    const response = await examineeRepo.bulkExaminee(validatedData);

    $toast.success(response.message);
  } catch (error) {
    handleApiError(error);
  }
};

const readExcelFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = $xlsx.read(data, { type: 'array' });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const json = $xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        resolve(json.slice(1));
      } catch (error) {
        reject(new Error('Error parsing Excel file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsArrayBuffer(file);
  });
};




const validateExamineeData = (rows: any[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    let hasErrors = false;
    
    const processedData = rows.map((row, index) => {
      const firstName = (row[0] || '').toString().trim();
      const lastName = (row[1] || '').toString().trim();
      let middleName = (row[2] || '').toString().trim();
      const random5DigitNumber = Math.floor(10000 + Math.random() * 90000);
      const username = `${lastName?.toLowerCase().replace(/\s+/g, '')}_${firstName?.[0].toLowerCase().replace(/\s+/g, '')}_${random5DigitNumber}`;
      // Validate required fields
      
      if (!firstName) {
        hasErrors = true;
        $toast.error(`Row ${index + 2}: First name is required`);
      } else if (!/^[a-zA-Z\s-]+$/.test(firstName)) {
        hasErrors = true;
        $toast.error(`Row ${index + 2}: First name contains invalid characters`);
      } else if (firstName.length > 50) {
        hasErrors = true;
        $toast.error(`Row ${index + 2}: First name exceeds 50 characters`);
      }
      
      if (!lastName) {
        hasErrors = true;
        $toast.error(`Row ${index + 2}: Last name is required`);
      } else if (!/^[a-zA-Z\s-]+$/.test(lastName)) {
        hasErrors = true;
        $toast.error(`Row ${index + 2}: Last name contains invalid characters`);
      } else if (lastName.length > 50) {
        hasErrors = true;
        $toast.error(`Row ${index + 2}: Last name exceeds 50 characters`);
      }
      
      if (middleName && !/^[a-zA-Z]$/.test(middleName)) {
        middleName = middleName.charAt(0);
        $toast.warning(`Row ${index + 2}: Middle name was truncated to first character`);
      }
      
      return {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName || '',
        username,
        password: $password()
      };
    });
    
    if (hasErrors) {
      reject(new Error('Validation errors found in uploaded file'));
    } else {
      resolve(processedData);
    }
  });
};



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
