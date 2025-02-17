<template>
  <UICard
    :body="{ padding: 'sm:p-0 p-0' }"
    :defaults="{ base: ' border-l-2 border-emerald-400 overflow-hidden' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-1xl lg:text-2xl font-semibold">
          <USkeleton class="h-6 w-[260px]" />
        </h1>
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      </div>
    </template>
    <template #default>
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div class="flex justify-center relative p-5">
          <USkeleton class="h-32 w-32" :ui="{ rounded: 'rounded-full' }" />
        </div>
        <div class="grid grid-cols-12 text-sm p-3 capitalize gap-6">
          <div class="col-span-4 font-semibold"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-8"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-4 font-semibold"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-8"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-4 font-semibold"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-8"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-4 font-semibold"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-8"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-4 font-semibold"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-8"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-4 font-semibold"><USkeleton class="h-6 w-[150px]" /></div>
          <div class="col-span-8"><USkeleton class="h-6 w-[150px]" /></div>
        </div>

        <div class="flex flex-col p-3 gap-2">
          <h3 class="font-semibold"><USkeleton class="h-6 w-[150px]" /></h3>
          <div class="grid grid-cols-12 text-sm items-center" v-for="i in 5" :key="i">
            <div class="col-span-2 font-semibold">
              <USkeleton class="h-6 w-[40px]" />
            </div>
            <div class="col-span-7 font-semibold capitalize">
              <USkeleton class="h-6 w-[180px]" />
            </div>
            <div class="col-span-1">
              <USkeleton class="h-6 w-[60px]" />
            </div>
          </div>
        </div>
        <div class="flex items-center py-5 px-2">
          <h1 class="text-3xl font-bold">
            <USkeleton class="h-12 w-[200px]" />
          </h1>
        </div>
      </div>
    </template>
  </UICard>
</template>
