<script setup lang="ts">

</script>


<template>
    <div class="grid grid-cols-12 gap-5 container mx-auto py-12">
        <div class="col-span-12 lg:col-span-8 md:col-span-6 flex flex-col gap-3">
            <div class="relative bg-white flex items-center justify-between py-2 px-10 rounded-md h-52 drop-shadow-lg">
                <div class="flex flex-col gap-4 pr-12 flex-1">
                    <div class="flex items-center gap-5">
                        <div class="bg-white/90 rounded-full p-1 flex items-center">
                            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <USkeleton class="h-4 w-[250px]" />
                            <USkeleton class="h-4 w-[250px]" />
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <USkeleton class="h-4 w-[250px]" />
                        <USkeleton class="h-4 w-[100px]" />
                    </div>

                    <USkeleton class="h-4 w-full" />
                    <USkeleton class="h-4 w-[300px] flex mx-auto justify-center" />
                </div>
                <USkeleton class="h-full w-[200px]" />
            </div>

            <!-- end -->
            <!-- skeleton for analytics performance -->
            <UICustomCard>
                <template #header>
                    <USkeleton class="h-12 w-full" />
                </template>
                <template #body>
                    <div class="flex items-center flex-col md:flex-row w-full gap-5">
                        <USkeleton class="h-28 w-full" />
                        <USkeleton class="h-28 w-full" />
                        <USkeleton class="h-28 w-full" />
                        <USkeleton class="h-28 w-full" />
                    </div>
                    <div class="flex flex-col gap-3 mt-5">
                        <USkeleton class="h-28 w-full" />
                    </div>
                </template>
            </UICustomCard>
            <!-- end -->

            <!-- skeleton for recommended courses -->
            <UICustomCard>
                <template #header>
                    <USkeleton class="h-12 w-[200px]" />
                </template>
                <template #body>
                    <div class="flex flex-col gap-3 w-full">
                        <USkeleton class="h-28 w-full" />
                        <USkeleton class="h-28 w-full" />
                    </div>
                </template>
            </UICustomCard>
        </div>
        <!-- end -->
        <div class="col-span-12 lg:col-span-4 md:col-span-6 flex flex-col gap-3">
            <!-- skeleton for rating -->
            <UICustomCard>
                <template #header>
                    <USkeleton class="h-6 w-[250px]" />
                </template>
                <template #body>
                    <div class="flex flex-col items-center justify-center gap-2">
                        <USkeleton class="h-52 w-52" :ui="{ rounded: 'rounded-full' }" />
                        <USkeleton class="h-6 w-[150px]" />
                        <USkeleton class="pt-3 h-6 w-[250px]" />
                    </div>
                </template>
            </UICustomCard>
            <!-- end -->

            <!-- skeleton for quick stats -->
            <UICustomCard>
                <template #header>
                    <USkeleton class="h-8 w-[200px]" />
                </template>
                <template #body>
                    <div class="flex flex-col gap-3">
                        <USkeleton class="h-12 w-full" />
                        <USkeleton class="h-12 w-full" />
                        <USkeleton class="h-12 w-full" />
                    </div>
                </template>
            </UICustomCard>
            <!-- end -->

            <!-- skeleton for bulletin board -->
            <UICustomCard>
                <template #header>
                    <USkeleton class="h-8 w-[200px]" />
                </template>
                <template #body>
                    <USkeleton class="h-64 w-full" />
                </template>
            </UICustomCard>
            <!-- end -->
        </div>

    </div>

</template>
