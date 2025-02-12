<script setup>
definePageMeta({
    layout: 'empty',
    requiredRole: 'guest',
    // middleware: ['checkRole'],
})

useSeoMeta({
    title: 'Testify Signup Page',
    description: 'Testify Signup',
    ogTitle: 'Testify Signup Page',
    ogDescription: 'Testify Signup'
});




const { handleApiError } = useErrorHandler();
const { $toast } = useNuxtApp();
const username = ref('');
const password = ref('');
const config = useRuntimeConfig()


const handleSignup = async () => {
    try {
        const result = await $fetch(`${config.public.baseURL}/auth/signup`, {
            method: 'POST',
            body: {
                email: username.value,
                password: password.value
            }
        })
        if (result) {
            $toast.success('Successfully registered')
        } else {
            $toast.error('Invalid credentials ')
        }

    } catch (err) {
        return handleApiError(err)
    }


}
</script>



<template>
    <div class="flex justify-center items-center max-w-sm  lg:max-w-3xl mx-auto min-h-screen ">
        <div class="w-full rounded-lg shadow-lg bg-white dark:bg-cardColor">
            <form @submit.prevent="handleSignup">
                <div class="grid grid-cols-2">
                    <div class="col-span-2 lg:col-span-1 py-12 px-10">
                        <h1 class="text-2xl font-semibold uppercase text-gray-600">Login as Admin</h1>
                        <div class="">
                            <div class="mt-5">
                                <label for="username" class="text-gray-600 font-semibold">Username:</label>
                                <UIInput class="mt-1" type="text" id="username" v-model="username" required />
                            </div>
                            <div class="mt-5">
                                <label for="password" class="text-gray-600 font-semibold">Password:</label>
                                <UIInput class="mt-1 rounded-full" type="password" id="password" v-model="password"
                                    required />
                            </div>
                            <div class="flex items-center gap-2 mt-5">
                                <UICheckBox id="view"></UICheckBox>
                                <label for="view" class="text-red-500 font-medium">View Password</label>

                            </div>
                            <div class="mt-5">
                                <UIButton type="submit" class="ml-auto" variant="danger" :isRounded="true" size="block">
                                    Sign Up
                                </UIButton>

                            </div>
                        </div>
                    </div>
                    <div
                        class="lg:col-span-1 bg-[url('~/assets/images/background.jpg')] w-full h-auto bg-repeat bg-[center_bottom_-6rem]">
                    </div>
                </div>
            </form>
            <!-- <button type="button" @click="handleGitHub">Sign In as github</button> -->
        </div>

    </div>


</template>
