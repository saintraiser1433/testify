import { NextFunction, Request, Response } from "express";
import { examineeValidation, handleValidationError } from "../util/validation";
import {
  fetchExaminees,
  findExamineeByName,
  createExaminee,
  updateExamineeById,
  deleteExamineeById,
  getExamineeById,
  createBulkExaminee,
} from "../services/examinee.services";
import { ExamineeModel } from "../models";
import prisma from "../prisma/prisma";
import Joi from "joi";

export const getExaminee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const data = await fetchExaminees();
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const insertExaminee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const body = req.body;
  try {
    const { error, value } = examineeValidation.insert(body);

    if (error) {
      return handleValidationError(error, res)
    }

    const user = await findExamineeByName(value.first_name, value.last_name);
    if (user) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const response = await createExaminee(value);
    return res.status(201).json({ message: "Student created successfully", data: response });
  } catch (err) {
    next(err);
  }
};


interface ValidationResult {
  error?: Joi.ValidationError;
  value: ExamineeModel;
}


export const insertBulkExaminee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const body = req.body;
  try {

    const validationResults: ValidationResult[] = body.map((data: ExamineeModel) =>
      examineeValidation.insert(data)
    );

    // Check for validation errors
    const errors = validationResults.filter(r => r.error);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation errors",
        errors: errors.flatMap(e => e.error?.details || [])
      });
    }

    // Check for duplicates in the request
    const names = new Set();
    for (const { value } of validationResults) {
      const key = `${value.first_name.toLowerCase()}_${value.last_name.toLowerCase()}`;
      if (names.has(key)) {
        return res.status(400).json({
          message: "Duplicate names in the upload",
          details: `Duplicate name during uploading:  ${value.first_name} ${value.last_name} please remove it to excel`
        });
      }
      names.add(key);
    }

    // Check against existing examinees
    const existing = await Promise.all(
      validationResults.map(({ value }) =>
        findExamineeByName(value.first_name, value.last_name)
      )
    );

    const existingExaminees = existing.filter(e => e);
    if (existingExaminees.length > 0) {
      return res.status(409).json({
        message: "Some examinees already exist",
        details: existingExaminees.map(e => `${e?.first_name} ${e?.last_name} is already existing`)
      });
    }
    const examineesToCreate = validationResults.map(r => r.value);

    const response = await createBulkExaminee(examineesToCreate);

    return res.status(201).json({ message: "Student created successfully", data: response });
  } catch (err) {
    next(err);
  }
};



export const updateExaminee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const body = req.body;
  const id = req.params.id;
  try {
    const { error, value } = examineeValidation.update(body);

    if (error) {
      return handleValidationError(error, res)
    }

    const existingExaminee = await getExamineeById(req.params.id);
    if (!existingExaminee) {
      return res.status(404).json({ message: "Examinee not found" });
    }

    if (
      value.first_name !== existingExaminee.first_name &&
      value.last_name !== existingExaminee.last_name &&
      value.middle_name !== existingExaminee.middle_name
    ) {
      const user = await findExamineeByName(value.first_name, value.last_name);
      if (user) {
        return res.status(409).json({ message: "Examinee already exists" });
      }
    }

    const response = await updateExamineeById(id, value);
    return res.status(200).json({ message: "Examinee updated successfully", data: response });
  } catch (err) {
    next(err);
  }
};

export const deleteExaminee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;
  try {
    await deleteExamineeById(id);
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    next(err);
  }
};


