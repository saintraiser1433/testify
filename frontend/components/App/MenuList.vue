<script setup lang="ts">
const store = useStore();
defineProps({
  menuItems: Object,
});
</script>

<style scoped></style>

<template>
  <li v-for="menu in menuItems" :key="menu.routerName">
    <NuxtLink :to="{ name: menu.routerName }" class="list__item-child">
      <component :is="menu.icon" :class="{ 'lg:mx-auto': !store.isOpen }" />
      <span class="flex-grow text-capitalize" :class="!store.isOpen ? 'lg:hidden' : ''">{{
        menu.label
      }}</span>
    </NuxtLink>
  </li>
</template>
