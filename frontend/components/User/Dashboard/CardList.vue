<script lang="ts" setup>
const props = defineProps({
  increment: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  hasTrailing: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<ColorLegend>,
    validator: (value: string) => ["fair", "good", "vg", "excellent"].includes(value),
  },
});

const { type } = toRefs(props);

const colorDefinitions = {
  fair: {
    bg: "bg-carnation-400/30",
    text: "text-carnation-500",
  },
  good: {
    bg: "bg-amber-400/30",
    text: "text-amber-500",
  },
  vg: {
    bg: "bg-blue-400/30",
    text: "text-blue-500",
  },
  excellent: {
    bg: "bg-emerald-400/30",
    text: "text-emerald-500",
  },
  default: {
    bg: "bg-gray-300/50",
    text: "text-dark-body-950",
  },
};

const styles = computed(
  () =>
    colorDefinitions[type?.value as keyof typeof colorDefinitions] ||
    colorDefinitions.default
);
</script>

<template>
  <div
    :class="[styles.bg]"
    class="flex items-center justify-between p-3 gap-2 w-full text-semibold rounded-md drop-shadow-lg"
  >
    <div class="flex items-center gap-2">
      <div
        v-if="hasTrailing"
        class="flex justify-center items-center bg-gradient-to-r from-green-600 to-cyan-500 text-white rounded-full h-8 w-8"
      >
        {{ increment }}
      </div>
      <h4 class="font-semibold uppercase">
        {{ description }}
      </h4>
    </div>

    <span :class="[styles.text]" class="font-bold">
      <slot name="trailing-right"></slot>
    </span>
  </div>
</template>
