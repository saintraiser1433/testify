

export const useExamTimer = (examineeId?: string, examId?: number) => {
    const store = useExamStore();
    const { $api, $toast } = useNuxtApp();
    const remainingTime = ref(0);
    let timerInterval: NodeJS.Timeout | null = null;
    let timerIntervalForSession: NodeJS.Timeout | null = null;

    const clearExistingTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    };

    const clearExistingTimeSession = () => {
        if (timerIntervalForSession) {
            clearInterval(timerIntervalForSession);
            timerIntervalForSession = null;
        }
    }

    //examRunningTimer
    const startTimerWithCallBack = (time: number, callback: () => void) => {
        clearExistingTimer();
        remainingTime.value = time;
        timerInterval = setInterval(() => {
            if (remainingTime.value > 0) {
                remainingTime.value--;
                store.setTimeLimit(formatTime(remainingTime.value));

            } else {
                clearExistingTimer();
                callback();
            }
        }, 1000);

    };

    //sessionTimer
    const sessionTimer = repository<ApiResponse<null>>($api);
    const updateSessionTimer = () => {
        timerIntervalForSession = setInterval(async () => {
            try {
                await sessionTimer.updateExamSessionTimer(remainingTime.value, examineeId, examId);
            } catch (err:any) {
                $toast.error(err.data.message || 'An error occurred while updating session timer')
            }
        }, 5000);
    };

    //
    const startTimerNavigation = (time: number, path: string) => {
        clearExistingTimer();
        remainingTime.value = time;
        timerInterval = setInterval(async () => {
            if (remainingTime.value > 0) {
                remainingTime.value--;

            } else {
                clearExistingTimer();
                await navigateTo({ name: path });
            }
        }, 1000);

    };







    return {
        remainingTime,
        clearExistingTimer,
        clearExistingTimeSession,
        startTimerWithCallBack,
        updateSessionTimer,
        startTimerNavigation
    }

}