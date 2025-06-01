export default defineAppConfig({
    ui: {
        primary: "currentColor",
        button: {
            default: {
                color: 'primary'

            },
            color: {
                gray: {
                    solid: 'dark:bg-gray-100 dark:text-black'
                }
            }
        },
        select: {
            default: {
                rounded: 'rounded-lg',
            }
        },
    }
})