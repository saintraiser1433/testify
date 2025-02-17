<template>
  <UICard
    :body="{ padding: 'sm:p-0 p-0' }"
    :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }"
  >
    <template #header>
      <div class="flex justify-between items-center p-0">
        <div class="flex flex-col">
          <USkeleton class="h-6 w-[260px]" />
        </div>
        <USkeleton class="h-6 w-12" :ui="{ rounded: 'rounded-full' }" />
      </div>
    </template>
    <div
      class="flex justify-between items-center w-full px-2 py-2 flex-col lg:flex-row gap-3 bg-white dark:bg-darken"
    >
      <div class="flex flex-wrap items-center gap-1.5">
        <USkeleton class="h-6 w-[150px]" />
        <USkeleton class="h-6 w-[230px]" />
        <USkeleton class="h-6 w-[50px]" />
      </div>
    </div>
    <div class="flex flex-col px-2 py-2">
      <USkeleton class="h-6 h-[400px]" />
      <div class="flex justify-between mt-2">
        <USkeleton class="h-6 w-[250px]" />
        <div class="flex gap-1">
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
        </div>
      </div>
    </div>
  </UICard>
</template>
