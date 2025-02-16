<template>
  <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
    <!-- sidebar -->
    <AppMenu />
    <!-- header -->
    <AppNavBar />
    <!-- main -->
    <main
      :class="store.isOpen ? 'lg:ml-60' : 'lg:ml-20'"
      class="col-span-3 px-5 pt-2 my-12 pb-8 transition-all ease-in-out"
    >
      <div class="flex items-center flex-wrap justify-end pb-4"></div>
      <div class="py-2">
        <div class="flex flex-col lg:flex-row gap-2 items-center justify-between mb-3">
          <h1 class="text-2xl font-bold">{{ store.moduleTitle }}</h1>
          <UBreadcrumb
            :ui="{ ol: 'flex flex-wrap items-center justify-center gap-x-1.5' }"
            :links="store.link"
          />
        </div>
        <slot></slot>
      </div>
    </main>

    <!-- footer -->
    <AppFooter footerName="Janzkiee Tech Solution" />

    <teleport to="body">
      <div
        @click="store.toggleState"
        :class="store.isOpen ? 'lg:hidden' : 'hidden lg:hidden'"
        class="block h-screen w-screen bg-[#171925] opacity-50 z-20 fixed top-0"
      ></div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
const store = useStore();
const { refreshToken, signOut, info } = useAuthentication();
const { idle } = useIdle(50 * 10 * 1000);
const parse = JSON.parse(info.value);
watch(idle, async (newValue: boolean) => {
  if (newValue) {
    await signOut(parse.id);
    return navigateTo({ name: "auth" });
  }
});

useIntervalFn(() => {
  refreshToken();
}, 50000);
</script>

<style scoped></style>
