// Base Timestamp Interface

interface Timestamped {
    createdAt?: Date;
    updatedAt?: Date;
}



// Examinee Model


// Course Model
export interface CourseModel extends Timestamped {
    course_id?: number;
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
    question_id?: number;
    questionList?: QuestionModel; // Optional relationship
    description: string;
    status?: boolean;
    answersList?: AnswersModel[]; // Optional relationship
}

// Answers Model
export interface AnswersModel extends Timestamped {
    examinee_id: number;
    exam_id: number;
    question_id: number;
    choices_id: number;
    examineeList?: User; // Optional relationship
    examList?: ExamModel; // Optional relationship
    questionList?: QuestionModel; // Optional relationship
    choicesList?: ChoicesModel; // Optional relationship
}

// ExamAttempt Model
export interface ExamAttemptModel extends Timestamped {
    examinee_id: number;
    exam_id: number;
    examineeList?: User; // Optional relationship
    examList?: ExamModel; // Optional relationship
}

// Department Model
export interface DepartmentModel extends Timestamped {
    department_id?: number;
    department_name: string;
    status: boolean;
    deansList?: DeansModel; // Optional relationship
}

// Deans Model
export interface DeansModel extends Timestamped {
    deans_id?: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    fullname?: string;
    username?: string;
    password?: string;
    status: boolean
    department_id: number; // Unique
    department?: DepartmentModel; // Optional relationship
    assignDeansList?: AssignDeansModel[]; // Optional relationship
}

// AssignDeans Model
export interface AssignDeansModel extends Timestamped {
    deans_id?: number;
    course_id?: number;
    deans?: DeansModel; // Optional relationship
    course?: CourseModel; // Optional relationship
}


export interface DeansInfoData {
    deans: DeansModel[];
    department: DepartmentModel[];
}

export interface AssignDeansInfoData {
    assignCourses: AssignDeansModel[];
    filteredCourses: CourseModel[];
}

export interface Token {
    token: TokenDetail,
    user: User

}

export interface FollowupModel {
    examinee_id?: string,
    gender: string,
    strand: string,
    contact_number: string,
    school: string,
}



export interface TokenDetail {
    accessToken: string;
    refreshToken: string;
}

export interface refreshTokenModel {
    accessToken: string
}

export interface DepartmentSelection {
    name: string | undefined,
    value: number | undefined

}

export interface User {
    id?: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    middle_name?: string,
    username?: string,
    password?: string,
    accessToken?: string,
    refreshToken?: string,
    fullname?: string
    role?: Role
}





export type Role = 'admin' | 'examinee' | 'deans';

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}






export interface TokenStatus {
    user?: any;
    message?: string
    status: string
}

export interface ApiResponse<T> {
    status: number,
    message: string,
    data?: T,
}


export interface CardProps {
    padding?: string,
    base?: string

}
export interface CardDefaultProps {
    base?: string,
    divide?: string
}

export interface TableProps {
    padding?: string,
    base?: string
}



export interface SubmitExamModel {
    examinee_id: string,
    exam_id?: number,
    details: {
        question_id: number,
        choices_id: number
    }[]

}

export interface ExamChoice {
    value: number;
    label: string;
}
export interface ExamQuestion {
    question_id: {
        value: number,
        class: string
    };
    question: {
        value: string,
        class: string
    };
    selectedChoice?: number | null;
    choices: ExamChoice[];
}

export interface ExamDetails {
    exam_id: number;
    time_limit: number;
    exam_title: string;
    data: ExamQuestion[];
}

export interface ExamAnswerDetails {
    question_id: number,
    choices_id: number
}


export interface SummaryData {
    exam_id: number,
    exam_title: string,
    correctAnswers: number,
    totalQuestions: number,
}



export interface AttemptsExam {
    examineeAttempt: number,
    totalExams: number,
}

export interface ExamineeInformation extends AttemptsExam {
    examinee_id: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    birth_date: string,
    gender: 'Male' | 'Female',
    school: string,
    email: string,
    address: string,
    contact_number: string,
    examDate: string
}




export interface SummaryResult extends ExamineeInformation {
    examDetails: SummaryData[]
}


export interface AllResults extends ExamineeInformation {
    totalCorrect: number,
    totalQuestions: number
}





//sessions
export interface SessionExamModel {
    examinee_id: string,
    exam_id?: number,
    time_limit: number,
    question_id: number,
    choices_id: number
}


export interface SessionExamineeDetail {
    question_id: number,
    choices_id: number,
}

export interface SessionExamineeHeader {
    session_id: string,
    timelimit: number,
    examinee_id: string,
    exam_id: number,
    sessionDetails: SessionExamineeDetail[]

}

//consolidateanswer

interface Exam {
    exam_title: string;
    exam_id: number
}

interface Answer {
    choices_id: number;
}

export interface Choice {
    choices_id: number;
    description: string;
    status: boolean;
    answerList: Answer[];
}

export interface ConsoQuestionDetails {
    question_id: number;
    question: string;
    examList: Exam;
    choicesList: Choice[];
}

export interface SummaryScore {
    totalQuestions: number,
    correctAnswers: number
}

export interface ConsoSummary {
    summaryScore: SummaryScore[],
    data: ConsoQuestionDetails[]
}

export interface ExamAnswer {
    questionId: number,
    answerId: number
}

export interface BreadCrumbsModel {
    label: string;
    icon?: string;
    to?: string;
}


export interface LegendModel {
    label: string,
    color: LegendColor
}


//Legend
type LegendColor = 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'rose' | 'primary' | 'carnation' | 'cyan'


export type ProgressColor = 'rose' | 'primary' | 'cyan' | 'emerald';










