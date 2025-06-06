import { Request, Response, NextFunction } from 'express';
import { consolidateMyAnswerFunc, deleteSessionAnswerFunc, getSessionAnswerFunc, insertAnswerFunc, updateSessionTimeFunc, upsertSessionAnswerFunc } from '../services/answer.services';
import { checkExamAvailableService } from '../services/exam.services';


export const insertAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const body = req.body;

  try {
    await insertAnswerFunc(body);
    const responsed = await checkExamAvailableService(body.examinee_id);

    if (responsed === null) {
      return res.status(404).json({ message: "Examinee not found" });
    }

    if (responsed === 1) {
      return res.status(409).json({ message: "The exam is finished" });
    }

    return res.status(201).json({
      message: 'Submitted Successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getSessionAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { examineeId, examId } = req.params;
  try {
    const sessionDetails = await getSessionAnswerFunc(examineeId, examId);
    return res.status(200).json(sessionDetails);
  } catch (err) {
    next(err)
  }
};

export const upsertSessionAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { examinee_id, exam_id, time_limit, question_id, choices_id } = req.body;
  try {
    await upsertSessionAnswerFunc(
      examinee_id,
      exam_id,
      time_limit,
      question_id,
      choices_id
    );
    return res.status(200).json({
      status: res.statusCode,
      message: 'Successfully saved answer',
    });
  } catch (err: unknown) {
    next(err)
  }
};

export const updateSessionTime = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { examineeId, examId } = req.params;
  const { time_limit } = req.body;
  try {
    await updateSessionTimeFunc(examineeId, examId, time_limit);
    return res.status(200).json({
      status: res.statusCode,
      message: 'Successfully updated time',
    });
  } catch (err) {
    next(err)
  }
};

export const deleteSessionAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { examineeId, examId } = req.params;
  try {
    await deleteSessionAnswerFunc(examineeId, examId);
    return res.status(200).json({
      status: res.statusCode,
      message: 'Session removed successfully',
    });
  } catch (err) {
    next(err)
  }
};

export const consolidateMyAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { examineeId, examId } = req.params;
  try {
    const result = await consolidateMyAnswerFunc(examineeId, examId);
    return res.status(200).json(result);
  } catch (err) {
    next(err)
  }
};