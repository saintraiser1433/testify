<template>
  <div class="grid grid-cols-[260px,1fr,1fr] grid-rows-[auto,1fr] h-screen">
    <!-- header -->
    <AppUserNavbar />
    <!-- main -->

    <main class="col-span-3 px-5 py-5 my-12 transition-all ease-in-out">
      <slot />
    </main>

    <!-- footer -->
    <!-- <AppFooter mode="user" footerName="John Rey Nalla Decosta" /> -->
  </div>
</template>

<script setup lang="ts">
const { refreshToken, signOut, info } = useAuthentication();
const { idle } = useIdle(480000);
const user = JSON.parse(info.value);
watch(idle, async (newValue: boolean) => {
  if (newValue) {
    await signOut(user.id);
    return navigateTo({ name: 'auth' });
  }
});

useIntervalFn(() => {
  refreshToken();
}, 50000);
</script>

<style scoped></style>
