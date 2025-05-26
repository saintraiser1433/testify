<template>
    <UForm :schema="schema" :state="formFollowup" class="gap-2 grid grid-cols-2" @submit="onSubmit">
        <UFormGroup class="col-span-2 lg:col-span-1" label="Gender" name="gender" required>
            <USelect v-model.number="formFollowup.gender" color="gray" :options="gender" option-attribute="name" />
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="Birth Date" name="birth_date" required>
            <UInput type="date" v-model="formFollowup.birth_date" color="gray" />
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="Contact Number" name="contact_number" required>
        <UInput type="text" v-model="formFollowup.contact_number" maxlength="11" color="gray">
            <template #trailing>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formFollowup.contact_number?.length }}/11</span>
            </template>
         </UInput>
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="Email" name="email" required>
            <UInput type="email" v-model="formFollowup.email" color="gray" />
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="School Graduated" name="school" required>
            <UInput v-model="formFollowup.school" color="gray" />
        </UFormGroup>
        <UFormGroup class="col-span-2 lg:col-span-1" label="Address" name="address" required>
            <UTextarea v-model="formFollowup.address" :rows="4" size="lg" color="gray" />

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
    (e: 'dataInformation', payload: FollowupModel): void;
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


const formFollowup = ref<FollowupModel>({
    gender: undefined,
    birth_date: undefined,
    contact_number: undefined,
    school: undefined,
    email: undefined,
    address: undefined,

});


const schema = $joi.object({
    gender: $joi.string().required().messages({
        "any.required": `Gender is Required`,
    }),
    birth_date: $joi.string().required().messages({
        "any.required": `Birth Date is Required`,
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
    email: $joi.string().required().messages({
        "any.required": `Email is Required`,
    }),
    address: $joi.string().required().messages({
        "any.required": `Address is Required`,
    })


});

const onSubmit = () => {
    emits('dataInformation', formFollowup.value);
}



</script>
