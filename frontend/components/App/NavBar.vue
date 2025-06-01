<script setup lang="ts">
const store = useStore();
const colorMode = useColorMode();
const setColorTheme = (theme: any) => {
  colorMode.preference = theme;
};

const { signOut, info } = useAuthentication();
const parse = JSON.parse(info.value);
const handleSignOut = async () => {
  await signOut(parse.id);
  return navigateTo({ name: "auth" });
};
</script>

<style scoped></style>
<template>
  <div
    :class="
      store.isOpen
        ? ' lg:w-[calc(100%-15rem)] lg:left-60'
        : 'lg:w-[calc(100%-5rem)] lg:left-20'
    "
    class="fixed top-0 bg-white dark:border-colorBorder z-30 dark:bg-darken py-2 border-b border-opacity-10 w-full col-span-2 transition-all ease-in-out"
  >
    <div class="mx-auto flex justify-between px-5">
      <button @click="store.toggleState">
        <i-solar-list-linear />
      </button>
      <ul class="flex justify-between items-center gap-3">
        <li>
          <UPopover>
            <div
              class="w-10 h-10 cursor-pointer rounded-full flex justify-center items-center bg-gray-300"
            >
              <svg-icon name="seticons/man" width="36" height="36" />
            </div>
            <template #panel>
              <ul
                class="grid grid-cols-1 divide-y dark:divide-gray-700 dark:bg-darken content-center text-sm"
              >
                <li class="p-2 hover:bg-gray-100 hover:dark:bg-gray-700">
                  <button class="flex gap-2 items-center px-1" @click="handleSignOut()">
                    <i-majesticons-logout-half-circle-line />Logout
                  </button>
                </li>
              </ul>
            </template>
          </UPopover>
        </li>
      </ul>
    </div>
  </div>
</template>
