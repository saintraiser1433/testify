export default defineNuxtRouteMiddleware(async (to, from) => {
    const id = Number(to.params.id);
    const nuxtApp = useNuxtApp()
    const { handleApiError } = useErrorHandler();
    const examRepo = repository(nuxtApp.$api);
    try {
        const response = await examRepo.getExamId(id);
        const title = response.exam_title || "Default Title";
        const description = response.description || "Not found";
        if (response) {
            useSeoMeta({
                title: title.toUpperCase(),
                description: description,
                ogTitle: title,
                ogDescription: description,
                // ogImage: '/path/to/image.jpg',
            });
            to.meta.examTitle = title;
            return;
        }
        nuxtApp.$toast.error('Exam not found');
        return nuxtApp.runWithContext(() => navigateTo({ name: "admin-exam" }));
    } catch (error) {
        handleApiError(error);
        return nuxtApp.runWithContext(() => navigateTo({ name: "admin-exam" }));
    }
});