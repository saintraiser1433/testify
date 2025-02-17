<script setup>

defineProps({
    footerName: String
})
</script>



<template>
    <footer class="fixed bottom-0 col-span-2 col-start-2 w-full  text-center transition-all ease-in-out">
        <div class="py-2 rounded-md px-2 bg-white  dark:bg-darken">
            <p class="text-sm">Developed by: {{ footerName }}</p>
        </div>
    </footer>
</template>
