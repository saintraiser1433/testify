<template>
    <UForm :schema="schema" :state="formFollowup" class="flex flex-col gap-2" @submit="onSubmit">
        <UFormGroup class="col-span-2 lg:col-span-1" label="Gender" name="gender" required>
            <USelect v-model.number="formFollowup.gender" color="gray" :options="gender" option-attribute="name" />
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="Contact Number" name="contact_number" required>
        <UInput type="text" v-model="formFollowup.contact_number" maxlength="11" color="gray">
            <template #trailing>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formFollowup.contact_number?.length }}/11</span>
            </template>
         </UInput>
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="Strand" name="strand" required>
            <USelect v-model.number="formFollowup.strand" color="gray" :options="strand" option-attribute="name" />
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="School Graduated" name="school" required>
            <UInput v-model="formFollowup.school" color="gray" />
        </UFormGroup>

        <div class="col-span-2 border-t dark:border-gray-600 pt-2">
            <UButton type="submit" color="gray" size="md" :ui="{
                color: {
                    gray: {
                        solid: 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600'
                    }
                }
            }">Submit</UButton>
        </div>

    </UForm>
</template>
<script lang="ts" setup>
const emits = defineEmits<{
    (e: 'dataInformation', payload: Partial<FollowupModel>): void;
}>()

const { $joi } = useNuxtApp();

const gender = [
    {
        name: 'Male',
        value: 'Male'
    },
    {
        name: 'Female',
        value: 'Female'
    },
]

const strand = [
    {
        name: '(ABM) - Accountancy, Business and Management',
        value: '(ABM) - Accountancy, Business and Management'
    },
    {
        name: '(STEM) - Science, Technology, Engineering, and Mathematics',
        value: '(STEM) - Science, Technology, Engineering, and Mathematics'
    },
    {
        name: '(HUMSS) - Humanities and Social Science',
        value: '(HUMSS) - Humanities and Social Science'
    },
    {
        name: '(GAS) - General Academic Strand',
        value: '(GAS) - General Academic Strand'
    },
    {
        name: '(TVL) - Technical-Vocational-Livelihood',
        value: '(TVL) - Technical-Vocational-Livelihood'
    },
]


const formFollowup = ref<Partial<FollowupModel>>({
    gender:undefined,
    contact_number: undefined,
    school: undefined,
    strand: undefined,
});


const schema = $joi.object({
    gender: $joi.string().required().messages({
        "any.required": `Gender is Required`,
    }),
    contact_number: $joi
    .string()
    .pattern(/^09\d{9}$/)
    .required()
    .messages({
        "string.pattern.base": "Contact Number must start with 09 and be 11 digits long",
        "any.required": "Contact Number is Required",
    }),
    school: $joi.string().required().messages({
        "any.required": `School is Required`,
    }),
    strand: $joi.string().required().messages({
        "any.required": `Strand is Required`,
    }),

});

const onSubmit = () => {
    emits('dataInformation', formFollowup.value);
}



</script>
