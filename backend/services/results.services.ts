import {
  GroupedExamMap,
  GroupExamPassedMap,
  Question,
  QuestionModel,
  UserInformation,
} from '../models';
import prisma from '../prisma/prisma';

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
                examinee_id: id,
              },
            },
          },
        },
      },
      where: {
        choicesList: {
          some: {
            answersList: {
              none: {
                examinee_id: id,
              },
            },
          },
        },
      },

      orderBy: {
        exam_id: 'asc',
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

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
              },
            },
          },
        },
      },
      where: {
        choicesList: {
          some: {
            answersList: {
              none: {},
            },
          },
        },
      },

      orderBy: {
        exam_id: 'asc',
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

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
            others: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
    return header;
  } catch (err) {
    throw err;
  }
};

export const countAttempt = async (id: string) => {
  try {
    const countAttempt = await prisma.examAttempt.aggregate({
      _count: true,
      where: {
        examinee_id: id,
      },
    });

    return countAttempt;
  } catch (err) {
    throw err;
  }
};

export const countOfExam = async (id: string) => {
  try {
    const numberOfExams = await prisma.exam.aggregate({
      _count: true,
      where: {
        questionList: {
          some: {
            choicesList: {
              some: {},
            },
          },
        },
      },
    });

    return numberOfExams;
  } catch (err) {
    throw err;
  }
};

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

  return Object.values(detail);
};

export const allResult = async (): Promise<UserInformation[]> => {
  try {
    const totalQuestions = await prisma.question.count();

    const usersWithScores = await prisma.$queryRaw<UserInformation[]>`
      SELECT 
        u.id as examinee_id,
        u.first_name,
        u.last_name,
        u.middle_name,
        f.school,
        f.contact_number,
        f.gender,
        MAX(a."createdAt") as "examDate",
        f.strand,
        f.others,
        COALESCE(COUNT(CASE WHEN c.status = true AND a.choices_id = c.choices_id THEN 1 END), 0)::integer as "totalCorrect"
      FROM "User" u
      INNER JOIN "FollowUp" f ON u.id = f.examinee_id
      INNER JOIN "Answers" a ON u.id = a.examinee_id
      INNER JOIN "Choices" c ON a.choices_id = c.choices_id
      GROUP BY u.id, f.school, f.contact_number, f.gender, f.strand, f.others
      ORDER BY "totalCorrect" DESC
    `;

    // 4. Format the results
    const users = usersWithScores.map((user) => ({
      examinee_id: user.examinee_id,
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name ?? '',
      school: user.school || '',
      contact_number: user.contact_number || '',
      gender: user.gender || '',
      totalCorrect: Number(user.totalCorrect), // Ensure it's a number
      examDate: user.examDate,
      strand: user.strand || '',
      others: user.others || '',
      totalQuestions,
    }));

    return users;
  } catch (err) {
    throw err;
  }
};

export const getExamineeRankById = async (
  examineeId: string
): Promise<{ rank: number }> => {
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

    answers.forEach((answer) => {
      const currentExamineeId = answer.examinee_id;
      const isCorrect =
        answer.choicesList.status &&
        answer.choicesList.choices_id === answer.choicesList.choices_id;

      if (!scores[currentExamineeId]) {
        scores[currentExamineeId] = 0;
      }

      if (isCorrect) {
        scores[currentExamineeId]++;
      }
    });

    // Convert to array and sort by score (descending)
    const examinees = Object.entries(scores).map(([id, score]) => ({
      id,
      score,
    }));
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
        rank: currentRank,
      };
    });

    // Find the examinee's rank
    const examineeRank =
      rankedExaminees.find((e) => e.id === examineeId)?.rank ?? 0;

    return { rank: examineeRank };
  } catch (err) {
    throw err;
  }
};
