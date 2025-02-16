<template>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12 lg:col-span-8">
      <UICard
        :body="{ padding: 'sm:p-0' }"
        :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }"
        :has-action-header="false"
      >
        <template #header>
          <div class="flex justify-between items-center p-0">
            <div class="flex flex-col">
              <USkeleton class="h-6 w-[260px]" />
            </div>

            <USkeleton class="h-6 w-12" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </template>
        <div class="px-2 py-2">
          <USkeleton class="h-[400px]" />
        </div>
      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <UICard
        :body="{ padding: 'sm:p-0' }"
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
        <div class="flex flex-col gap-2 px-2 py-2">
          <USkeleton class="h-[368px]" />
          <USkeleton class="h-6" />
        </div>
      </UICard>
    </div>
  </div>
  <div class="grid grid-cols-12 my-5 gap-3">
    <div class="col-span-12">
      <UICard
        :body="{ padding: 'sm:p-0' }"
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
        <div class="flex flex-col gap-2 px-2 py-2">
          <USkeleton class="h-[400px]" />
        </div>
      </UICard>
    </div>
  </div>
</template>
