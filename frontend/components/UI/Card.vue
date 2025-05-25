<script lang="ts" setup>
import type { CardProps, CardDefaultProps } from '~/types';



defineProps({
  hasHeader: {
    type: Boolean,
    default: true,
  },
  hasFooter: {
    type: Boolean,
    default: false,
  },
  header: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  },
  body: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  },
  footer: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  },
  defaults: {
    type: Object as PropType<CardDefaultProps>,
    default: () => ({})
  },
  background: {
    type: Object as PropType<CardProps>,
    default: () => ({})
  }

})
</script>


<template>
  <UCard class="w-full" :ui="{
    base: defaults?.base || 'overflow-hidden',
    background: background?.base,
    shadow: 'shadow-sm dark:shadow-sm',
    divide: 'divide-0 divide-gray-200 dark:divide-gray-700',
    header: { padding: header?.padding || 'sm:px-3 px-2 py-2', base: header?.base || 'dark:bg-darken' },
    body: { padding: body?.padding || 'sm:px-3 sm:py-3', base: body?.base || 'dark:bg-darken' },
    footer: { padding: footer?.padding || '', base: footer?.base || 'dark:bg-darken' }
  }">
    <template v-if="hasHeader" #header>
      <slot name="header"> </slot>
    </template>
    <slot></slot>
    <template v-if="hasFooter" #footer>
      <slot name="footer"> </slot>
    </template>
  </UCard>

</template>
