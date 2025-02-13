export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const repo = repository(nuxtApp.$api);
    const { info } = useAuthentication();
    const inf = JSON.parse(info.value);


    const response = await repo.getFollowup(inf.id);
    if (response) {
        return nuxtApp.runWithContext(() => navigateTo({ name: "user-exam" }));
    }
    return;
})