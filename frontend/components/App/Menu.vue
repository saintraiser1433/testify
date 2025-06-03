<script setup lang="ts">
import Home from '~icons/lucide/home';
import HugeiconsStudentCard from '~icons/hugeicons/student-card';
import FluentMdl2PartyLeader from '~icons/fluent-mdl2/party-leader';
import LucideBook from '~icons/lucide/book';
import SubwayBook from '~icons/subway/book';
import SolarPenLineDuotone from '~icons/solar/pen-line-duotone';
import MdiChartLine from '~icons/mdi/chart-line';
const store = useStore();
const colorMode = useColorMode();
const setColorTheme = (theme: any) => {
  colorMode.preference = theme;
};

const colorPreferenceText = computed(() => {
  const colorPreference =
    colorMode.preference === 'dark'
      ? 'Switch to Light Mode '
      : 'Switch to Dark Mode';
  if (store.isOpen) {
    return colorPreference;
  }
  return '';
});

const item = ref([
  { label: 'Home', routerName: 'admin-home', icon: Home },
  {
    label: 'Examinee',
    routerName: 'admin-examinee',
    icon: HugeiconsStudentCard,
  },
  // { label: 'Deans', routerName: 'admin-deans', icon: FluentMdl2PartyLeader },
  // { label: 'Department', routerName: 'admin-department', icon: LucideBook },
  { label: 'Course', routerName: 'admin-course', icon: SubwayBook },
  { label: 'Exam', routerName: 'admin-exam', icon: SolarPenLineDuotone },
  { label: 'Rankings', routerName: 'admin-rankings', icon: MdiChartLine },
]);
</script>

<style scoped></style>

<template>
  <aside
    :class="
      store.isOpen ? 'lg:w-60' : '-translate-x-full lg:w-20 lg:translate-x-0'
    "
    class="flex flex-col justify-between bg-white dark:bg-darken h-full row-span-2 px-2 py-2 z-50 shadow-lg overflow-hidden border-r w-60 fixed left-0 top-0 border-slate-100 dark:border-colorBorder rounded-sm transition-all ease-in-out"
  >
    <div
      class="flex ml-2 items-center border-b border-slate-300 dark:border-colorBorder pb-2 text-center mb-2"
    >
      <span class="sprite sprite-small-lg ml-2"></span>
      <span
        :class="store.isOpen ? 'lg:block' : 'lg:hidden'"
        class="font-exam font-bold text-2xl ml-2"
      >
        TESTIFY</span
      >
    </div>
    <ul class="flex flex-col grow overflow-auto custom-scrollbar">
      <AppMenuList :menu-items="item"></AppMenuList>
    </ul>

    <UButton
      @click="
        setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')
      "
      :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-line-md-moon'"
      variant="soft"
      color="primary"
      class="flex items-center justify-center gap-2 w-full"
      >{{ colorPreferenceText }}</UButton
    >
  </aside>
</template>
