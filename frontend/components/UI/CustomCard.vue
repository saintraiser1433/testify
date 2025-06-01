<script setup lang="ts">
defineProps({
  hasHeader: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="bg-white p-2 rounded-md drop-shadow-lg dark:bg-darken">
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
    <div class="px-3 py-2">
      <slot name="body"></slot>
    </div>
  </div>
</template>
