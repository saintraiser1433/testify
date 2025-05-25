<script setup lang="ts">
const store = useStore();

defineProps({
  footerName: String,
  mode: {
    type: String,
    default: 'admin',
    required: false
  }
});
</script>

<template>
  <footer :class="[
    mode === 'admin' 
      ? (store.isOpen
          ? 'lg:ml-60 lg:w-[calc(100%-15rem)]'
          : 'lg:ml-20 lg:w-[calc(100%-5rem)]')
      : '',
    'fixed  bottom-0 col-span-2 col-start-2 w-full lg:px-5 text-center transition-all ease-in-out',
  ]">
    <div class="py-2 rounded-md px-2 bg-white dark:bg-darken">
      <p class="text-sm">Developed by: {{ footerName }}</p>
    </div>
  </footer>
</template>