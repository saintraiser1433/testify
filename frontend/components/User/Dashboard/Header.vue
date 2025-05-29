<template>
  <div class="bg-[url('@/assets/images/bgheaders.png')] w-full h-16 bg-cover flex justify-between items-center px-2 py-10">
    <!-- -->
    <slot></slot>
    <!-- <NuxtImg v-if="icon" :src="icon" quality="80" width="64" height="64" /> -->
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  icon: {
    type: String,
    required: false
  }
})
</script>
