<template>
  <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
    <!-- header -->
    <AppUserNavbar />
    <!-- main -->

    <main class="col-span-3 px-5 pt-2 my-12 pb-8 transition-all ease-in-out">
      <div class="flex items-center flex-wrap justify-end pb-4">

      </div>
      <slot />
    </main>


    <!-- footer -->
    <AppUserFooter footerName="Janzkiee Tech Solution" />

  </div>
</template>

<script setup lang="ts">

const { refreshToken, signOut, info } = useAuthentication();
// const { idle } = useIdle(50 * 10 * 100);
// const user = JSON.parse(info.value)
// watch(idle, async (newValue: boolean) => {
//   if (newValue) {
//     await signOut(user.id);
//     return navigateTo({ name: 'auth' })
//   }
// });

useIntervalFn(() => {
  refreshToken();
}, 3000000);
</script>

<style scoped></style>