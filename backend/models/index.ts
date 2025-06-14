// Base Timestamp Interface
import { Request } from 'express';

interface Timestamped {
  createdAt?: Date;
  updatedAt?: Date;
}

// Examinee Model
export interface ExamineeModel extends Timestamped {
  examinee_id?: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  password: string;
  answersList?: AnswersModel[]; // Optional relationship
  examAttemptList?: ExamAttemptModel[]; // Optional relationship
}

// Course Model
export interface CourseModel extends Timestamped {
  course_id: number;
  description: string;
  score: number;
  assignDeansList?: AssignDeansModel[]; // Optional relationship
}

// Exam Model
export interface ExamModel extends Timestamped {
  exam_id?: number;
  exam_title: string;
  description: string;
  time_limit: number;
  status: boolean;
  questionList?: QuestionModel[]; // Optional relationship
  answersList?: AnswersModel[]; // Optional relationship
  examAttemptList?: ExamAttemptModel[]; // Optional relationship
}

// Question Model
export interface QuestionModel extends Timestamped {
  question_id?: number;
  question: string;
  exam_id?: number;
  examList?: ExamModel[]; // Optional relationship
  choicesList?: ChoicesModel[]; // Optional relationship
  answersList?: AnswersModel[]; // Optional relationship
}

// Choices Model
export interface ChoicesModel extends Timestamped {
  choices_id?: number;
  question_id: number;
  questionList?: QuestionModel; // Optional relationship
  description: string;
  status: boolean;
  Answers?: AnswersModel[]; // Optional relationship
}

// Answers Model
export interface AnswersModel extends Timestamped {
  examinee_id: number;
  exam_id: number;
  question_id: number;
  choices_id: number;
  examineeList?: ExamineeModel; // Optional relationship
  examList?: ExamModel; // Optional relationship
  questionList?: QuestionModel; // Optional relationship
  choicesList?: ChoicesModel; // Optional relationship
}

// ExamAttempt Model
export interface ExamAttemptModel extends Timestamped {
  examinee_id: number;
  exam_id: number;
  examineeList?: ExamineeModel; // Optional relationship
  examList?: ExamModel; // Optional relationship
}

// Department Model
export interface DepartmentModel extends Timestamped {
  department_id?: number;
  department_name: string;
  status: boolean;
  Deans?: DeansModel; // Optional relationship
}

// Deans Model
export interface DeansModel extends Timestamped {
  deans_id?: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  password: string;
  department_id: number; // Unique
  department?: DepartmentModel; // Optional relationship
  assignDeansList?: AssignDeansModel[]; // Optional relationship
}

// AssignDeans Model
export interface AssignDeansModel extends Timestamped {
  deans_id: number;
  course_id: number;
  deans?: DeansModel; // Optional relationship
  course?: CourseModel; // Optional relationship
}

export interface AuthModel {
  id?: string;
  username?: string;
  password?: string;
  role: string;
}

export interface DecodedPayload {
  id: string;
  email: string | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  role: string;
}

export interface answerModel {
  examinee_id: string;
  exam_id: number;
  choices_id: number;
  question_id: number;
}

export interface AllResultModel {
  examineeId: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  total_questions: number;
  total_correct_answers: number;
  fullname?: string;
}

export interface ExamHeader {
  exam_id: number;
  time_limit: number;
  exam_title: string;
  data: ExamDetailsModel[];
}

export interface ExamDetailsModel {
  question_id: number;
  question: string;
  choices: {
    value: number;
    label: string;
  }[];
}

//for results summary
export interface Answer {
  choices_id: number;
  examinee_id?: string;
}

export interface Choice {
  choices_id: number;
  description: string;
  status: boolean;
  answersList: Answer[];
}

export interface Exam {
  exam_id: number;
  exam_title: string;
}

export interface Question {
  question: string;
  question_id: number;
  examList: Exam;
  choicesList: Choice[];
}

export interface FollowUpModel {
  gender: string;
  contact_number: string;
  school: string;
  strand: string;
  others?: string;
  examDate: Date;
}
export interface UserInformation extends FollowUpModel, TheTotal {
  examinee_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface TheTotal {
  totalCorrect: number;
  totalQuestions: number;
}

interface GroupedExam {
  exam_id?: number;
  exam_title?: string;
  totalQuestions: number;
  correctAnswers: number;
}

interface GroupCoursesPassed {
  course_name: string;
  totalPassed: number;
}

export interface TheTotal {
  totalCorrect: number;
  totalQuestions: number;
  totalExaminee?: number;
}

interface GroupExamPassed extends TheTotal {
  exam_id: number;
  exam_title: string;
  totalPercentage: number;
  totalAttempt: number;
}

//dashboard
export interface RegisteredVsCompletedModel {
  formatted_date: string;
  Registered: number;
  Completed: number;
}

export interface ExamPassed extends TheTotal {
  exam_id: number;
  exam_title: string;
}

export interface QuestionPercentage {
  exam_title: string;
  question: string;
  totalCorrect: number;
  totalAttempt: number;
}

export type GroupedExamMap = Record<number, GroupedExam>;
export type GroupedCoursesMap = Record<number, GroupCoursesPassed>;
export type GroupExamPassedMap = Record<number, GroupExamPassed>;
// export type GroupedExamPassedMap = Record<number, GroupCoursesPassed>;

interface UserPayload {
  id: string;
  username: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
