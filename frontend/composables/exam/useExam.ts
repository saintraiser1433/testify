export const useExam = (
    question: Ref<ExamDetails | null>,
    sessionAnswer: Ref<SessionExamineeHeader[] | null>,
    examineeId: string,
    remainingTime: Ref<number>
) => {

    const { $api, $toast } = useNuxtApp();
    const isRadioDisabled = useState('disabled', () => false);
    const shouldRefetch = ref(0);
    const isLoading = ref(false);
    const showUnanswered = ref(false);
    const answers = ref<Record<number, number>>({});
    const examTitle = computed(() => question.value?.exam_title ? `Exam Title : ${question.value?.exam_title}` : 'Exam');
    const answerCount = computed(() => Object.keys(answers.value).length);
    const totalQuestions = computed(() => question.value?.data.length ?? 0);
    const { handleApiError } = useErrorHandler()
    //customize question
    const questionDetails = computed(() => {
        if (!question.value) return [];

        const answeredIds = new Set(Object.keys(answers.value).map(item => Number(item)));

        return question.value.data.map((item) => {
            const isAnswered = answeredIds.has(Number(item.question_id));
            const highlightClass = !isAnswered && showUnanswered.value
                ? 'bg-red-400 dark:bg-red-500'
                : '';

            return {
                question_id: {
                    value: Number(item.question_id),
                    class: highlightClass,
                },
                question: {
                    value: String(item.question),
                    class: highlightClass,
                },
                choices: item.choices
            };
        }); // Randomly sort the array
    });


    //submition exam
    const examRepo = repository<ApiResponse<null>>($api);
    const sessionExamRepo = repository<ApiResponse<null>>($api);
    const performSubmit = useDebounceFn(async (submitData: SubmitExamModel) => {
        isLoading.value = true;
        try {
            const { status } = await examRepo.submitExam(submitData);
            if (status === 201) {
                answers.value = {};
                if (sessionAnswer.value) {
                    await sessionExamRepo.deleteExamSession(submitData);
                }

 
                shouldRefetch.value++;
               
       

            }
        } catch (error) {
            return handleApiError(error);

        } finally {
            isLoading.value = false;
        }
    }, 1000, { maxWait: 3000 });


    const submitExam = async () => {
        const data = Object.entries(answers.value).map(([questionId, choicesId]) => ({
            question_id: parseInt(questionId),
            choices_id: choicesId
        }));

        const submitData: SubmitExamModel = {
            examinee_id: examineeId,
            exam_id: question.value?.exam_id,
            details: data
        };

        if (remainingTime.value > 0) {
            if (answerCount.value !== question.value?.data.length) {
                showUnanswered.value = true;
                await findMissing()
                $toast.error('Please answer all questions before proceeding');
            } else {
                setAlert('info', 'Are you sure you want to submit your answer? Once you submit, your answer will be final!', '', 'Confirm submit').then(
                    async (result) => {
                        if (result.isConfirmed) {
                            try {
                                isRadioDisabled.value = true;
                                await performSubmit(submitData);
                                showUnanswered.value = false;
                            } catch (error) {
                                return handleApiError(error);

                            }
                        }
                    }
                )
            }

        } else {

            $toast.warning('Times up');
            isRadioDisabled.value = true;
            await performSubmit(submitData);
            showUnanswered.value = false;
        }


    };

    //find missing
    const findMissing = async () => {
        showUnanswered.value = true;
        const answeredQuestionIds = new Set(Object.keys(answers.value).map(questionId => parseInt(questionId)))
        const firstUnanswered = question.value?.data.find(item =>
            !answeredQuestionIds.has(Number(item.question_id))
        );

        if (firstUnanswered) {
            await nextTick(() => {
                const element = document.getElementById(`question-${firstUnanswered.question_id}`);
                element?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        } else {
            $toast.success('You have answered all the questions. You may now proceed to submit your exam.');
        }
    };





    return {
        isLoading,
        findMissing,
        shouldRefetch,
        answers,
        examTitle,
        answerCount,
        totalQuestions,
        questionDetails,
        submitExam
    }

}
