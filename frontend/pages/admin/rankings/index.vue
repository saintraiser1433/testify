<script setup lang="ts">
definePageMeta({
  requiredRole: 'admin',
});
useSeoMeta({
  title: 'Testify Rankings Module',
  description: 'Rankings',
  ogTitle: 'Testify Rankings Module',
  ogDescription: 'Rankings',
});

const { $toast, payload, static: stat, $datefns } = useNuxtApp();
const store = useStore();
store.setModuleTitle('RANKINGS');
store.setLink(RANKINGS_BREADCRUMBS);
const slipData = ref<GenerateSlip[]>([]);
const isOpen = ref(false);
const statuses = computed(() => status.value === 'pending');
const { data, status, error } = await useAPI<AllResults[]>('/results', {
  server: false,
});

if (error.value) {
  $toast.error(error.value.message || 'Failed to fetch items');
}

const dataResults = computed(() => {
  return data.value
    ?.map((item) => {
      const totalQuestions = Number(item.totalQuestions) || 0;
      const totalCorrectAnswers = Number(item.totalCorrect) || 0;

      const successRate =
        totalQuestions > 0
          ? parseFloat(
              ((totalCorrectAnswers / totalQuestions) * 100).toFixed(2)
            )
          : 0;
      return {
        ...item,
        examDateTrans: $datefns.format(item.examDate, 'MMM d, yyyy'),
        successRate,
        color: setProgressBarColor(successRate),
      };
    })
    .sort((a, b) => b.totalCorrect - a.totalCorrect);
});

const topRankings = computed(() => {
  if (!dataResults.value) return [];

  return dataResults.value
    .slice()
    .sort((a, b) => b.totalCorrect - a.totalCorrect)
    .slice(0, 10);
});

const getDataSlip = (data: GenerateSlip[]) => {
  slipData.value = data;
  isOpen.value = true;
};
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-7xl' }" prevent-close>
          <UICard>
            <template #header>
              <div class="flex items-center justify-between">
                <h1 class="text-2xl lg:text-lg font-semibold">
                  Bulk Generate Slip
                </h1>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="isOpen = false"
                />
              </div>
            </template>
            <RankingGenerateSlip :data="slipData" />
          </UICard>
        </UModal>
        <div class="grid grid-cols-12 gap-3">
          <div class="col-span-12 lg:col-span-4">
            <RankingTopList :data="topRankings" />
          </div>
          <div class="col-span-12 lg:col-span-8">
            <RankingResultList
              :is-loading="statuses"
              :data="dataResults"
              @data-slip="getDataSlip"
            />
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <div>
        <SkeletonRecord />
      </div>
    </template>
  </Suspense>
</template>
