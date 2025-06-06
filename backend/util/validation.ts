// const Joi = require('joi');
import Joi from 'joi';
import { Response } from 'express';
import {
    ChoicesModel,
    CourseModel,
    DeansModel,
    DepartmentModel,
    ExamineeModel,
    ExamModel,
    QuestionModel,
} from "../models";

export const examineeValidation = {
    insert: (data: ExamineeModel) => {
        const schema = Joi.object({
            first_name: Joi.string().required().messages({
                "string.base": `First Name should be a type of 'text'`,
                "string.empty": `First Name cannot be empty`,
                "string.min": `First Name should have a minimum length of {#limit}`,
                "string.required": `First Name cannot be null or empty`,
            }),
            last_name: Joi.string().required().messages({
                "string.base": `Last Name should be a type of 'text'`,
                "string.empty": `Last Name cannot be empty`,
                "string.min": `Last Name should have a minimum length of {#limit}`,
                "string.required": `Last Name cannot be null or empty`,
            }),
            middle_name: Joi.string().allow('').optional(),
            username: Joi.string().min(3).required().messages({
                "any.required": `Username cannot be null or empty`,
            }),

            password: Joi.string().min(3).empty().required().messages({
                "any.required": `Password cannot be null or empty`,
            }),
            email: Joi.string().optional(),
            role: Joi.string().optional()
        });
        return schema.validate(data, { abortEarly: false });

    },

    update: (data: ExamineeModel) => {
        const schema = Joi.object({
            id: Joi.string().optional(),
            first_name: Joi.string().min(3).empty().optional(),
            last_name: Joi.string().min(3).empty().optional(),
            middle_name: Joi.string().min(0).empty().optional(),
            username: Joi.string().min(3).empty().optional(),
            password: Joi.string().min(3).empty().optional(),
        });
        return schema.validate(data, { abortEarly: false });
    },
};

export const courseValidation = {
    insert: (data: CourseModel) => {
        const schema = Joi.object({
            description: Joi.string().required().messages({
                "string.empty": `Course cannot be empty`,
                "any.required": `Course cannot be null or empty`,
            }),
            score: Joi.number().required().messages({
                "any.required": `Score cannot be null or empty`,
            }),
        });
        return schema.validate(data, { abortEarly: false });
    },
    update: (data: CourseModel) => {
        const schema = Joi.object({
            course_id: Joi.number().optional(),
            description: Joi.string().empty().optional().messages({
                "string.empty": `Description cannot be empty`,
            }),
            score: Joi.number().empty().optional().messages({
                "string.base": `Score should be a type of 'number'`,
                "string.empty": `Score cannot be empty`,
            }),
        });
        return schema.validate(data, { abortEarly: false });
    },
};

export const departmentValidation = {
    validate: (data: DepartmentModel) => {
        const schema = Joi.object({
            department_id: Joi.number().optional(),
            department_name: Joi.string().required().messages({
                "string.empty": `Department Name cannot be empty`,
                "any.required": `Department Name cannot be null or empty`,
            }),
            status: Joi.boolean().optional(),
        });
        return schema.validate(data, { abortEarly: false });
    },
};

export const examValidation = {
    insert: (data: ExamModel) => {
        const schema = Joi.object({
            exam_title: Joi.string().required().messages({
                "string.empty": `Question cannot be empty`,
                "any.required": `Question cannot be null or empty`,
            }),
            description: Joi.string().required().messages({
                "string.empty": `Exam Title cannot be empty`,
                "any.required": `Exam Title cannot be null or empty`,
            }),
            time_limit: Joi.number().required().messages({
                "string.empty": `Time Limit cannot be empty`,
                "any.required": `Time Limit cannot be null or empty`,
            }),
            status: Joi.boolean().optional()
        });
        return schema.validate(data, { abortEarly: false });
    },
    update: (data: ExamModel) => {
        const schema = Joi.object({
            exam_title: Joi.string().min(1).empty().optional().messages({
                "string.min": `Exam Title should have a minimum length of {#limit}`,
                "string.empty": `Exam Title cannot be empty`,
            }),
            description: Joi.string().min(1).empty().optional().messages({
                "string.min": `Exam description cannot be empty`,
            }),
            time_limit: Joi.number().min(1).empty().optional().messages({
                "number.min": `Time Limit cannot be empty`,
            }),
            exam_id: Joi.number().required().messages({
                "any.required": `Seem's no exam id attached`,
            }),
            status: Joi.boolean().optional(),
        });
        return schema.validate(data, { abortEarly: false });
    },
};

export const questionValidation = {
    insert: (data: QuestionModel) => {
        const schema = Joi.object({
            question: Joi.string().required().messages({
                "string.empty": `Question cannot be empty`,
                "any.required": `Question cannot be null or empty`,
            }),
            exam_id: Joi.number().required().messages({
                "number.empty": `Exam cannot be empty`,
                "number.required": `Exam cannot be null or empty`,
            }),
        });
        return schema.validate(data, { abortEarly: false });
    },
    update: (data: QuestionModel) => {
        const schema = Joi.object({
            question: Joi.string().required().messages({
                "string.empty": `Question cannot be empty`,
                "any.required": `Question cannot be null or empty`,
            }),
            question_id: Joi.number().required(),
        });
        return schema.validate(data, { abortEarly: false });
    },
};

export const choicesValidation = {
    insert: (data: ChoicesModel) => {
        const schema = Joi.array()
            .items({
                description: Joi.string().required().messages({
                    "string.empty": `Choice cannot be empty`,
                    "any.required": `Choice cannot be null or empty`,
                }),
                status: Joi.boolean().optional(),
            })
            .min(1)
            .messages({
                "array.min": "At least one choice is required",
            });
        return schema.validate(data, { abortEarly: false });
    },
    update: (data: ChoicesModel) => {
        const schema = Joi.array()
            .items({
                description: Joi.string().required().messages({
                    "string.empty": `Choice cannot be empty`,
                    "any.required": `Choice cannot be null or empty`,
                }),
                choices_id: Joi.number().optional(),
                question_id: Joi.number().optional(),
                status: Joi.boolean().optional(),
            })
            .min(1)
            .messages({
                "array.min": "At least one choice is required",
            });
        return schema.validate(data, { abortEarly: false });
    },
};

export const deansValidation = {
    insert: (data: DeansModel) => {
        const schema = Joi.object({
            first_name: Joi.string().empty().min(3).required().messages({
                "string.empty": `First Name cannot be empty`,
                "any.required": `First Name cannot be null or empty`,
            }),
            last_name: Joi.string().empty().min(3).required().messages({
                "string.empty": `Last Name cannot be empty`,
                "any.required": `Last Name cannot be null or empty`,
            }),
            middle_name: Joi.string().empty().min(3).required().messages({
                "string.empty": `Middle Name cannot be empty`,
                "any.required": `Middle Name cannot be null or empty`,
            }),
            username: Joi.string().empty().required().messages({
                "string.empty": `Username cannot be empty`,
                "any.required": `Username cannot be null or empty`,
            }),
            password: Joi.string().empty().required().messages({
                "string.empty": `Password cannot be empty`,
                "any.required": `Password cannot be null or empty`,
            }),
            department_id: Joi.number().empty().required().messages({
                "number.empty": `Department cannot be empty`,
                "any.required": `Department cannot be null or empty`,
            }),
            status: Joi.boolean().optional(),
        });
        return schema.validate(data, { abortEarly: false });
    },
    update: (data: DeansModel) => {
        const schema = Joi.object({
            deans_id: Joi.number().required().messages({
                "number.empty": `Deans ID cannot be empty`,
                "any.required": `Deans ID cannot be null or empty`,
            }),
            first_name: Joi.string().min(1).optional().messages({
                "string.min": `First Name cannot be empty`,
            }),
            last_name: Joi.string().min(1).optional().messages({
                "string.min": `Last Name cannot be empty`,
            }),
            middle_name: Joi.string().optional().messages({
                "string.min": `Middle Name cannot be empty`,
            }),
            username: Joi.string().min(1).optional().messages({
                "string.min": `Username cannot be empty`,
            }),
            password: Joi.string().min(1).optional().messages({
                "string.min": `Password cannot be empty`,
            }),
            department_id: Joi.number().min(1).optional().messages({
                "number.min": `Department cannot be empty`,
            }),
            status: Joi.boolean().optional(),
        });
        return schema.validate(data, { abortEarly: false });
    },
};


export const handleValidationError = (error: Joi.ValidationError, res: Response) => {
    return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((detail) => detail.message),
    });
};
