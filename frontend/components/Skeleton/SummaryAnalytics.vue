<script lang="ts" setup></script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <div class="col-span-12 lg:col-span-3">
      <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
        <div class="flex justify-between items-center p-5 font-semibold">
          <div class="flex flex-col gap-3">
            <USkeleton class="h-6 w-[250px]" />
            <USkeleton class="h-6 w-[250px]" />
          </div>
          <div class="rounded-full relative p-2">
            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
        <div class="px-2 py-2">
          <USkeleton class="h-16 px-2 py-2" />
        </div>
      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
        <div class="flex justify-between items-center p-5 font-semibold">
          <div class="flex flex-col gap-3">
            <USkeleton class="h-6 w-[250px]" />
            <USkeleton class="h-6 w-[250px]" />
          </div>
          <div class="rounded-full relative p-2">
            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
        <div class="px-2 py-2">
          <USkeleton class="h-16 px-2 py-2" />
        </div>
      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
        <div class="flex justify-between items-center p-5 font-semibold">
          <div class="flex flex-col gap-3">
            <USkeleton class="h-6 w-[250px]" />
            <USkeleton class="h-6 w-[250px]" />
          </div>
          <div class="rounded-full relative p-2">
            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
        <div class="px-2 py-2">
          <USkeleton class="h-16 px-2 py-2" />
        </div>
      </UICard>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <UICard :body="{ padding: 'sm:p-0 p-0' }" :has-header="false">
        <div class="flex justify-between items-center p-5 font-semibold">
          <div class="flex flex-col gap-3">
            <USkeleton class="h-6 w-[250px]" />
            <USkeleton class="h-6 w-[250px]" />
          </div>
          <div class="rounded-full relative p-2">
            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
          </div>
        </div>
        <div class="px-2 py-2">
          <USkeleton class="h-16 px-2 py-2" />
        </div>
      </UICard>
    </div>
  </div>
</template>
