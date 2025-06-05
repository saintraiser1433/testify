<template>
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 lg:col-span-4">
      <SkeletonTopList />
    </div>
    <div class="col-span-12 lg:col-span-8">
      <UICard
        :defaults="{ base: 'border-b-2 border-emerald-400 overflow-hidden' }"
        :header="{ padding: 'p-3' }"
        :body="{ padding: 'sm:p-0 p-0' }"
        :has-action-header="false"
      >
        <template #header>
          <div class="flex justify-between items-center p-0">
            <USkeleton class="h-8 w-[240px]" />
          </div>
        </template>

        <template #default>
          <div
            class="flex justify-between items-center w-full px-2 py-2 flex-col lg:flex-row gap-3 bg-white dark:bg-darken"
          >
            <div class="flex flex-wrap items-center gap-1.5">
              <!-- <span class="text-sm leading-5">Rows per page:</span> -->
              <USkeleton class="h-8 w-[100px]" />
              <USkeleton class="h-8 w-[160px]" />
              <USkeleton class="h-8 w-[80px]" />
            </div>
            <div class="flex gap-1.5 items-center">
              <USkeleton class="h-8 w-[180px]" />
              <USkeleton class="h-8 w-[180px]" />
            </div>
          </div>
          <UDivider></UDivider>
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="i in 10"
              :key="i"
              class="grid grid-cols-12 gap-3 p-2 text-sm text-center"
            >
              <div class="col-span-1 flex justify-center items-center gap-2">
                <USkeleton class="h-6 w-full" />
              </div>
              <div class="col-span-1">
                <USkeleton class="h-6 w-full" />
              </div>
              <div class="col-span-4 capitalize">
                <USkeleton class="h-6 w-full" />
              </div>
              <div class="col-span-1 capitalize">
                <USkeleton class="h-6 w-full" />
              </div>
              <div class="col-span-2 capitalize">
                <USkeleton class="h-6 w-full" />
              </div>
              <div class="col-span-2 capitalize">
                <USkeleton class="h-6 w-full" />
              </div>
              <div class="col-span-1">
                <USkeleton class="h-6 w-full" />
              </div>
            </div>
          </div>
        </template>
      </UICard>
    </div>
  </div>
</template>

<script setup></script>
