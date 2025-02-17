export const useExamSession = (
    question: Ref<ExamDetails | null>,
    sessionAnswer: Ref<SessionExamineeHeader[] | null>,
    answers: Ref<Record<number, number>>,
    examineeId: string,
) => {
    const { $api, $toast } = useNuxtApp();
    const sessionExamRepo = repository<ApiResponse<null>>($api);
    const target = document.documentElement;
    //get session
    const sessionDetails = computed(() => {
        if (Array.isArray(sessionAnswer.value) && sessionAnswer.value.length > 0) {
            return sessionAnswer.value[0];
        }
        return null
    });

    //saved answers
    const sessionAnswerData = computed(() => {

        if (!sessionAnswer.value || !sessionAnswer.value[0]?.sessionDetails) {
            return {};
        }
        const reducedAnswers = sessionAnswer.value[0].sessionDetails.reduce<Record<number, number>>((acc, item) => {
            acc[item.question_id] = item.choices_id;
            return acc;
        }, {});

        answers.value = reducedAnswers;
        return reducedAnswers;
    });



    //debouncing after push
    const debounceSaveAnswer = useDebounceFn(async (questionId: number, answerId: number) => {
        if (!question.value?.time_limit || !question.value?.exam_id) {
            return $toast.error('Exam has not started yet')
        }
        await sessionExamRepo.insertExamSession({
            examinee_id: examineeId,
            time_limit: question.value.time_limit,
            exam_id: question.value.exam_id,
            question_id: questionId,
            choices_id: answerId
        });

    }, 1000, { maxWait: 5000 })

    //push answer
    const pushAnswer = (payload: ExamAnswer) => {
        answers.value = { ...answers.value, [payload.questionId]: payload.answerId };
        debounceSaveAnswer(payload.questionId, payload.answerId);
    }

    return {
        pushAnswer,
        sessionDetails,
        sessionAnswerData

    }



}