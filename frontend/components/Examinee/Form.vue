<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types';

const emits = defineEmits<{
  (e: 'dataExaminee', payload: User): void;
  (e: 'switchAdd'): void;
}>();

const model = defineModel<User>({ required: true });
const props = defineProps({
  isUpdate: {
    type: Boolean,
    required: true,
  },
});

const { isUpdate } = toRefs(props);
const { $password, $joi } = useNuxtApp();

const schema = $joi.object({
  first_name: $joi.string().required().empty().messages({
    'any.required': `First Name is Required`,
    'string.empty': `First Name is Required`,
  }),
  last_name: $joi.string().required().empty().messages({
    'any.required': `Last Name is Required`,
    'string.empty': `Last Name is Required`,
  }),
  middle_name: $joi.string().allow('').max(1).optional().messages({
    'string.max': `Middle Name must be 1 character`,
  }),
  username: $joi.string().optional(),
  password: $joi.string().optional(),
  id: $joi.string().optional(),
});

const switchAdd = () => {
  emits('switchAdd');
};

const onSubmit = async (event: FormSubmitEvent<User>) => {
  let data: User;
  const element = document.getElementById('focus');
  const random5DigitNumber = Math.floor(10000 + Math.random() * 90000);
  const username = `${event.data.last_name
    ?.toLowerCase()
    .replace(/\s+/g, '')}_${event.data.first_name?.[0]
    .toLowerCase()
    .replace(/\s+/g, '')}_${random5DigitNumber}`;
  if (!isUpdate.value) {
    data = {
      ...event.data,
      username,
      password: $password(),
    };
  } else {
    data = {
      ...event.data,
    };
  }
  emits('dataExaminee', data);

  element?.focus();
};
</script>

<template>
  <UForm :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="First Name" name="first_name" required>
      <UInput
        :autofocus="true"
        id="focus"
        v-model="model.first_name"
        color="gray"
        :ui="{ base: 'capitalize' }"
      />
    </UFormGroup>
    <UFormGroup label="Last Name" name="last_name" required>
      <UInput
        v-model="model.last_name"
        color="gray"
        :ui="{ base: 'capitalize' }"
      />
    </UFormGroup>
    <UFormGroup label="Middle Name" name="middle_name">
      <UInput
        v-model="model.middle_name"
        color="gray"
        :ui="{ base: 'capitalize' }"
      />
    </UFormGroup>
    <UButton
      v-if="isUpdate"
      @click="switchAdd"
      type="button"
      block
      color="gray"
      size="md"
      :ui="{
        color: {
          gray: {
            solid:
              'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 text-white hover:dark:bg-emerald-600',
          },
        },
      }"
      >Switch to Insert Students</UButton
    >
    <UButton
      type="submit"
      block
      color="gray"
      size="md"
      :ui="{
        color: {
          gray: {
            solid:
              'bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 text-white hover:dark:bg-primary-600',
          },
        },
      }"
    >
      {{ isUpdate ? 'Update Examinee' : 'Add Examinee' }}
    </UButton>
  </UForm>
</template>
