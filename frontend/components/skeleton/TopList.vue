<template>
  <div>
    <UICard
      :body="{ padding: 'sm:p-0 p-0' }"
      :defaults="{ base: ' border-b-2 border-emerald-400 overflow-hidden' }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <USkeleton class="h-6 w-[260px]" />
          <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
        </div>
      </template>
      <template #default>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div class="grid grid-cols-12 gap-3 p-2 text-center font-bold">
            <div class="col-span-1"></div>
            <div class="col-span-2"><USkeleton class="h-6 w-[60px]" /></div>
            <div class="col-span-6"><USkeleton class="h-6 w-[200px]" /></div>
            <div class="col-span-2"><USkeleton class="h-6 w-[60px]" /></div>
          </div>

          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="i in 10"
              :key="i"
              class="grid grid-cols-12 gap-3 p-2 text-sm text-center"
            >
              <div class="col-span-1 flex justify-center items-center gap-2">
                <USkeleton class="h-6 w-[60px]" />
              </div>
              <div class="col-span-2">
                <USkeleton class="h-6 w-[60px]" />
              </div>
              <div class="col-span-6 capitalize">
                <USkeleton class="h-6 w-[200px]" />
              </div>
              <div class="col-span-2">
                <USkeleton class="h-6 w-[60px]" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </UICard>
  </div>
</template>
<script setup lang="ts"></script>
