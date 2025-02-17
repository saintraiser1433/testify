export default defineNuxtRouteMiddleware(async (to, from) => {
    const ROLE_REDIRECTS: Record<Role, string> = {
        admin: 'admin-home',
        examinee: 'user',
        deans: 'deans-home'
    };

    const GUEST_ROUTES = ['auth', 'auth-signup']

    const { token, clearAuthTokens, info } = useAuthentication();
    const inf = JSON.parse(info.value);

    if (!token.value) {
        if (to.name !== 'auth') {
            clearAuthTokens();
            return navigateTo({ name: "auth" });
        }
        return;
    }
    try {

        if (GUEST_ROUTES.some(route => route === to.name)) {
            return;
        }
        const userRole = inf.role as Role;
        const requiredRole = to.meta.requiredRole as Role;
        if (userRole && requiredRole && userRole !== requiredRole) {
            return navigateTo({ name: ROLE_REDIRECTS[userRole] });
        }
    } catch (error) {
        clearAuthTokens();
        return navigateTo({ name: "auth" });
    }
})