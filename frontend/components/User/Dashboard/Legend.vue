<script setup lang="ts">
type ColorLegend = "fair" | "good" | "vg" | "excellent" | string;

const props = defineProps({
  type: {
    type: String as PropType<ColorLegend>,
    required: true,
    validator: (value: string) => ["fair", "good", "vg", "excellent"].includes(value),
  },
});

const { type } = toRefs(props);

const colorDefinitions = {
  fair: {
    bg: "bg-carnation-400/50",
    text: "text-carnation-500",
    dot: "bg-carnation-500",
  },
  good: {
    bg: "bg-amber-400/50",
    text: "text-amber-500",
    dot: "bg-amber-500",
  },
  vg: {
    bg: "bg-blue-400/50",
    text: "text-blue-500",
    dot: "bg-blue-500",
  },
  excellent: {
    bg: "bg-emerald-400/50",
    text: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  default: {
    bg: "bg-gray-200",
    text: "text-gray-700",
    dot: "bg-gray-500",
  },
};

const styles = computed(
  () =>
    colorDefinitions[type.value as keyof typeof colorDefinitions] ||
    colorDefinitions.default
);
</script>

<template>
  <div
    class="flex flex-col items-center rounded-md text-center drop-shadow-lg p-5 w-full"
    :class="[styles.bg]"
    role="region"
  >
    <div :class="styles.dot" class="h-4 w-4 rounded-full"></div>
    <div class="flex flex-col mt-3">
      <span :class="styles.text" class="font-semibold">
        <slot name="title">Default Title</slot>
      </span>
      <span class="text-sm">
        <slot name="description">Default description</slot>
      </span>
    </div>
  </div>
</template>
