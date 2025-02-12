<script setup lang="ts">
const colorMode = useColorMode();
const route = useRoute();
const store = useExamStore();

const setColorTheme = (theme:any) => {
  colorMode.preference = theme;
};



const timelimit = computed(() => store.timelimit);
const checkRoute = computed(() => route.path === '/user/exam');


const { signOut, info } = useAuthentication();
const parse = JSON.parse(info.value);
const handleSignOut = async () => {
  await signOut(parse.id)
  return navigateTo({ name: 'auth' })
};
</script>

<style scoped></style>

<template>
  <div
    class="fixed top-0 bg-white dark:border-colorBorder dark:bg-darken py-2 border-b border-opacity-10 w-full col-span-2 transition-all ease-in-out">
    <div class="mx-auto flex justify-between px-5">
      <div class="flex items-center gap-2">
        <span class="sprite sprite-small-lg ml-2"></span>
        <h2 class="font-semibold">Testify</h2>
      </div>
      <div v-if="checkRoute" class="flex justify-center items-center gap-3 font-bold">
        <h3>Time Remaining:</h3>
        <h1 class="text-danger">{{ timelimit }}</h1>
      </div>
      <ul class="flex justify-between items-center gap-3">
        <li>
          <a href="google.com">
            <i-bx-search />
          </a>
        </li>
        <li><i-heroicons-language /></li>
        <li class="flex items-center">
          <button @click="
            setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')
            ">
            <i-line-md-moon v-if="colorMode.value === 'dark'" />
            <i-lucide-sun v-else />
          </button>
        </li>
        <li><i-pixelarticons-add-grid /></li>
        <li><i-mdi-bell-outline /></li>
        <li>

          <UPopover>
            <div class="w-9 h-9 cursor-pointer relative">
              <img src="@/assets/images/avatar.png" class="w-full h-full rounded-full" alt="Avatar Logo" />
            </div>
            <template #panel>
              <ul class="grid grid-cols-1 divide-y dark:divide-gray-700 dark:bg-darken content-center  text-sm ">
                <li class="p-2 hover:bg-gray-100 hover:dark:bg-gray-700">
                  <NuxtLink class="flex gap-2 items-center px-1" to="/">
                    <i-iconamoon-profile-circle />Profile
                  </NuxtLink>
                </li>
                <li class="p-2 hover:bg-gray-100 hover:dark:bg-gray-700">
                  <NuxtLink class="flex gap-2 items-center px-1" to="/"><i-fa-cogs />Settings</NuxtLink>
                </li>
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

