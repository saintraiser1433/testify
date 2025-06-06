import { GroupedExamMap, GroupExamPassedMap, Question, QuestionModel, UserInformation } from "../models";
import prisma from "../prisma/prisma";

export const listOfQuestionsById = async (id: string) => {
    try {
        const result = await prisma.question.findMany({
            select: {
                question: true,
                question_id: true,
                examList: {
                    select: {
                        exam_id: true,
                        exam_title: true,

                    },

                },
                choicesList: {
                    select: {
                        choices_id: true,
                        description: true,
                        status: true,
                        answersList: {
                            select: {
                                choices_id: true,
                            },
                            where: {
                                examinee_id: id
                            }
                        }
                    }
                },

            },
            where: {
                choicesList: {
                    some: {
                        answersList: {
                            none: {
                                examinee_id: id
                            }
                        }
                    }
                }
            },

            orderBy: {
                exam_id: 'asc',
            }
        })

        return result;
    } catch (err) {
        throw err
    }

}

export const listOfQuestionsSummary = async () => {
    try {
        const result = await prisma.question.findMany({
            select: {
                question: true,
                question_id: true,
                examList: {
                    select: {
                        exam_id: true,
                        exam_title: true,
                    },

                },
                choicesList: {
                    select: {
                        choices_id: true,
                        description: true,
                        status: true,
                        answersList: {
                            select: {
                                examinee_id: true,
                                choices_id: true,
                            }
                        }
                    }
                },

            },
            where: {
                choicesList: {
                    some: {
                        answersList: {
                            none: {}
                        }
                    }
                }
            },

            orderBy: {
                exam_id: 'asc',
            }
        })

        return result;
    } catch (err) {
        throw err
    }

}

export const userInformation = async (id: string) => {
    try {
        const header = await prisma.user.findFirst({
            select: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                followupData: {
                    select: {
                        gender: true,
                        contact_number: true,
                        school: true,
                        strand: true,
                        others:true,
                    }
                }
            },
            where: {
                id: id
            },

        })
        return header;
    } catch (err) {
        throw err;
    }

}

export const countAttempt = async (id: string) => {
    try {
        const countAttempt = await prisma.examAttempt.aggregate({
            _count: true,
            where: {
                examinee_id: id
            }
        })

        return countAttempt;
    } catch (err) {
        throw err;
    }

}

export const countOfExam = async (id: string) => {
    try {
        const numberOfExams = await prisma.exam.aggregate({
            _count: true,
            where: {
                questionList: {
                    some: {
                        choicesList: {
                            some: {}
                        }
                    }

                }
            }
        })

        return numberOfExams;
    } catch (err) {
        throw err
    }

}


export const groupSummaryByExam = async (data: Question[]) => {
    const detail = data.reduce((group: GroupedExamMap, item: Question) => {
        const examId = item.examList.exam_id;
        if (!group[examId]) {
            group[examId] = {
                exam_id: examId,
                exam_title: item.examList.exam_title,
                totalQuestions: 0,
                correctAnswers: 0,
            };
        }

        group[examId].totalQuestions++;

        item.choicesList.forEach((choice) => {
            const isCorrect = choice.answersList.some(
                (answer) => answer.choices_id === choice.choices_id
            );

            if (isCorrect && choice.status) {
                group[examId].correctAnswers++;
            }
        });

        return group;
    }, {} as GroupedExamMap);


    return Object.values(detail)
}











// 

export const allResult = async (): Promise<UserInformation[]> => {
    try {
        const [result, countQuestions] = await Promise.all([
            prisma.question.findMany({
                select: {
                    question: true,
                    question_id: true,
                    examList: {
                        select: {
                            exam_id: true,
                            exam_title: true,
                        },
                    },
                    choicesList: {
                        select: {
                            choices_id: true,
                            description: true,
                            status: true,
                            answersList: {
                                select: {
                                    examinee_id: true,
                                    choices_id: true,
                                    createdAt: true,
                                    examineeList: {
                                        select: {
                                            first_name: true,
                                            last_name: true,
                                            middle_name: true,
                                            followupData: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    exam_id: 'asc',
                },
            }),
            prisma.question.aggregate({
                _count: true,
            }),
        ]);


        const map = result.reduce((group: any, item: any) => {
            item.choicesList.forEach((choice: any) => {
                choice.answersList.forEach((answer: any) => {
                    const examinee_id = answer.examinee_id;

                    if (!group[examinee_id]) {
                        group[examinee_id] = {
                            examinee_id: examinee_id,
                            first_name: answer.examineeList.first_name,
                            last_name: answer.examineeList.last_name,
                            middle_name: answer.examineeList.middle_name,
                            birth_date:
                                answer.examineeList.followupData[0]?.birth_date || '',
                            school: answer.examineeList.followupData[0]?.school || '',
                            email: answer.examineeList.followupData[0]?.email || '',
                            address: answer.examineeList.followupData[0]?.address || '',
                            contact_number: answer.examineeList.followupData[0]?.contact_number || '',
                            gender: answer.examineeList.followupData[0]?.gender || '',
                            totalCorrect: 0,
                            examDate: answer.createdAt,
                            totalQuestions: countQuestions._count,
                        };
                    }

                    const isCorrect = choice.choices_id === answer.choices_id && choice.status;

                    if (isCorrect) {
                        group[examinee_id].totalCorrect++;
                    }
                });
            });

            return group;
        }, {});
        // return result;
        return Object.values(map);
    } catch (err) {
        throw err; // Throw the error to be handled by the caller
    }
};




export const getExamineeRankById = async (examineeId: string): Promise<{ rank: number }> => {
    try {
        // Only fetch the minimal data needed to calculate scores
        const answers = await prisma.answers.findMany({
            select: {
                examinee_id: true,
                choicesList: {
                    select: {
                        choices_id: true,
                        status: true,
                    },
                },
            },
        });

        // Calculate scores for all examinees
        const scores: Record<string, number> = {};

        answers.forEach(answer => {
            const currentExamineeId = answer.examinee_id;
            const isCorrect = answer.choicesList.status && answer.choicesList.choices_id === answer.choicesList.choices_id;

            if (!scores[currentExamineeId]) {
                scores[currentExamineeId] = 0;
            }

            if (isCorrect) {
                scores[currentExamineeId]++;
            }
        });

        // Convert to array and sort by score (descending)
        const examinees = Object.entries(scores).map(([id, score]) => ({ id, score }));
        examinees.sort((a, b) => b.score - a.score);

        // Calculate ranks with ties
        let currentRank = 1;
        const rankedExaminees = examinees.map((examinee, index) => {
            // If not first element and score is different from previous, update currentRank
            if (index > 0 && examinee.score !== examinees[index - 1].score) {
                currentRank = index + 1;
            }
            return {
                ...examinee,
                rank: currentRank
            };
        });

        // Find the examinee's rank
        const examineeRank = rankedExaminees.find(e => e.id === examineeId)?.rank ?? 0;

        return { rank: examineeRank };
    } catch (err) {
        throw err;
    }
};