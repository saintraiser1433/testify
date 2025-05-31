<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
    default: 0,
  },
  totalAnswer: {
    type: Number,
    required: true,
    default: 0,
  },
  successRate: {
    type: Number,
    required: true,
  },
  color: {
    type: String as PropType<ProgressColor>,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex items-center justify-between p-3 gap-2 bg-gray-300/50 w-full text-dark-body-950 text-semibold rounded-md drop-shadow-lg"
  >
    <div class="flex items-center gap-3 flex-1">
      <i-humbleicons:crown class="text-emerald-500 font-bold" width="32" height="32" />
      <div class="flex flex-col gap-1 justify-center">
        <h4 class="font-semibold uppercase">{{ title }}</h4>
        <span class="text-sm font-semibold text-gray-500"
          >{{ correctAnswer }}/{{ totalAnswer }} points</span
        >
      </div>
    </div>
    <div class="flex items-center gap-5">
      <UProgress
        :value="successRate"
        :color="color"
        :ui="{
          progress: {
            width: 'w-25',
          },
        }"
      />
      <UBadge color="gray" variant="solid">{{ successRate }}%</UBadge>
    </div>
  </div>
</template>
