export const useExamStore = defineStore('examStore', {
    state: () => ({
        timelimit: '',
        examFinished: false,
    }),
    actions: {
        setTimeLimit(payload: string) {
            this.timelimit = payload;
        },
        setIsFinished(payload: boolean) {
            this.examFinished = payload;
        },
    },
})

