<script setup lang="ts">
defineProps({
  hasHeader: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="bg-white rounded-md p-2 drop-shadow-lg dark:bg-darken">
    <!-- header  -->
    <div v-if="hasHeader">
      <div class="flex items-center gap-2 p-2">
        <slot name="header"></slot>
      </div>
      <UDivider
        :ui="{
          border: {
            base: 'dark:border-gray-500',
          },
        }"
      />
    </div>

    <!--  end header -->
    <div class="py-2">
      <slot name="body"></slot>
    </div>
  </div>
</template>
