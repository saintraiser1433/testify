<template>
  <div class="bg-white p-2 rounded-md drop-shadow-lg">
    <!-- header  -->
    <div class="flex items-center gap-2 p-2">
      <slot name="header"></slot>
    </div>
    <UDivider />
    <!--  end header -->
    <div class="px-3 py-2">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
