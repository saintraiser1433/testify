export const useExamStore = defineStore('examStore', {
    state: () => ({
        timelimit: ''
    }),
    actions: {
        setTimeLimit(payload: string) {
            this.timelimit = payload;
        },
    },
})

