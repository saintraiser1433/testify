<script setup lang="ts">
const colorMode = useColorMode();
const route = useRoute();
const store = useExamStore();

const setColorTheme = (theme: any) => {
  colorMode.preference = theme;
};

const timelimit = computed(() => store.timelimit);
const checkRoute = computed(() => route.path === "/user/exam");

const { signOut, info } = useAuthentication();
const parse = JSON.parse(info.value);
const handleSignOut = async () => {
  await signOut(parse.id);
  return navigateTo({ name: "auth" });
};

const colorPreferenceText = computed(() => {
  return colorMode.preference === "dark"
    ? "Switch to Light Mode "
    : "Switch to Dark Mode";
});
</script>

<template>
  <div
    class="fixed top-0 bg-white dark:border-colorBorder dark:bg-darken py-2 border-b border-opacity-10 w-full col-span-2 transition-all ease-in-out z-50">
    <div v-if="checkRoute" class="flex justify-between items-center">
      <div class="flex flex-1 justify-center items-center gap-3 font-bold">
        <h2>TIME REMAINING:</h2>
        <h2 class="text-danger">{{ timelimit }}</h2>
      </div>
      <div>
        <UButton @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-line-md-moon'" variant="soft" color="primary"
          class="flex items-center justify-center gap-2 w-full">{{ colorPreferenceText }}</UButton>
      </div>



    </div>
    <div v-if="!checkRoute" class="mx-auto flex justify-between px-5">
      <div class="flex items-center gap-2">
        <span class="sprite sprite-small-lg ml-2"></span>
        <h2 class="font-semibold">Testify</h2>
      </div>

      <ul class="flex justify-between items-center gap-3">
        <li class="flex items-center">
          <UButton @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')"
            :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-line-md-moon'" variant="soft" color="primary"
            class="flex items-center justify-center gap-2 w-full">{{ colorPreferenceText }}</UButton>
        </li>
        <li>
          <UPopover>
            <div class="w-10 h-10 cursor-pointer rounded-full flex justify-center items-center bg-gray-300 ">
              <svg-icon name="seticons/man" width="36" height="36" />
            </div>
            <template #panel>
              <ul class="grid grid-cols-1 divide-y dark:divide-gray-700 dark:bg-darken content-center text-sm">
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
