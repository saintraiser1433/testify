export const useExamineeSummary = (data?: SummaryResult, dataCourse?: CourseModel[]) => {
    const summaryData = computed(() => data);

    const summaryScores = computed(() => {
        if (!summaryData.value) return { correctAnswers: 0, totalQuestions: 0 };

        const correctAnswers = summaryData.value.examDetails.reduce((a, b) => a + b.correctAnswers, 0);
        const totalQuestions = summaryData.value.examDetails.reduce((a, b) => a + b.totalQuestions, 0);
        return {
            correctAnswers,
            totalQuestions
        }
    })


    const examineeName = computed(() => {
        const middleNameInitial = summaryData.value?.middle_name ? summaryData.value.middle_name[0] : '';
        return `${summaryData.value?.last_name}, ${summaryData.value?.first_name} ${middleNameInitial}.`;
    });




    const courseData = computed(() => {
        if (!dataCourse || !summaryData.value) return [];
        return dataCourse.filter((item) => item.score <= (summaryScores.value.correctAnswers));
    });

    const isFinished = computed(() => {
        const examCnt = summaryData.value?.totalExams ?? 0;
        const examAttempt = summaryData.value?.examineeAttempt ?? 0;
        return examCnt === examAttempt;
    });


    const examAttempts = computed(() => {
        const examAttempt = summaryData.value?.examineeAttempt ?? 0;
        const examCnt = summaryData.value?.totalExams ?? 0;
        return `${examAttempt} / ${examCnt}`;
    });


    return {
        summaryData,
        courseData,
        summaryScores,
        examineeName,
        isFinished,
        examAttempts
    }
}