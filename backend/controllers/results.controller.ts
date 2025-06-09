import { NextFunction, Request, Response } from 'express';
import {
  listOfQuestionsById,
  userInformation,
  countAttempt,
  countOfExam,
  allResult,
  groupSummaryByExam,
  getExamineeRankById,
} from '../services/results.services';

export const fetchExamineeRank = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.examineeId;
  try {
    const result = await getExamineeRankById(id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getSummaryByExaminee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.examineeId;

  if (!id) {
    return res.status(400).json({ message: 'Examinee ID is required' });
  }

  try {
    const [questions, userInfo, attemptCount, examCount] = await Promise.all([
      listOfQuestionsById(id),
      userInformation(id),
      countAttempt(id),
      countOfExam(id),
    ]);

    const groupSummary = await groupSummaryByExam(questions);
    const combineData = {
      examinee_id: userInfo?.id || '',
      first_name: userInfo?.first_name || '',
      last_name: userInfo?.last_name || '',
      middle_name: userInfo?.middle_name || '',
      gender: userInfo?.followupData?.[0]?.gender || '',
      school: userInfo?.followupData?.[0]?.school || '',
      strand: userInfo?.followupData?.[0]?.strand || '',
      others: userInfo?.followupData?.[0]?.others || '',
      contact_number: userInfo?.followupData?.[0]?.contact_number || '',
      examineeAttempt: attemptCount._count,
      totalExams: examCount._count,
      examDetails: groupSummary,
    };

    return res.status(200).json(combineData);
  } catch (err) {
    next(err);
  }
};

export const getAllResult = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const result = await allResult();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
