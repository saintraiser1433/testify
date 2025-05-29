/**
 * Represents the dashboard data model, containing summary statistics,
 * daily registration vs completion data, courses passed, exam performance,
 * and question success rates.
 */
export interface DashboardModel {
    summary: TopBarSummary; // Summary statistics for the dashboard
    dailyRegisterVsCompleted: DailyRegistrationVsCompletion[]; // Daily registration vs completion data
    coursesPassed: ChartModel[]; // Data for courses passed (used in charts)
    examPassed: ExamPassed[]; // Data for exams passed
    summaryQuestions: QuestionPercentage[]; // Data for question success rates
    courseGender: CourseGender[]
}

export interface CourseGender {
    name: string;
    male: number;
    female: number;
}

/**
 * Represents a data point for charts, typically used for visualizations.
 */
export interface ChartModel {
    name: string; // Name of the data point (e.g., course name)
    value: number; // Value of the data point (e.g., number of passes)
}

/**
 * Represents daily registration and completion data for examinees.
 */
export interface DailyRegistrationVsCompletion {
    formatted_date: string; // Formatted date (e.g., "Mon DD, YYYY")
    Registered: number; // Number of examinees registered on this date
    Completed: number; // Number of examinees who completed exams on this date
}

/**
 * Represents summary statistics displayed in the top bar of the dashboard.
 */
interface TopBarSummary {
    registeredExaminee: number; // Total number of registered examinees
    completedExaminee: number; // Total number of examinees who completed exams
    totalCourse: number; // Total number of courses available
    totalExams: number; // Total number of exams available
}

/**
 * Represents data for exams passed by examinees.
 */
interface ExamPassed {
    exam_id: number; // Unique identifier for the exam
    exam_title: string; // Title of the exam
    totalQuestions: number; // Total number of questions in the exam
    totalExaminee: number; // Total number of examinees who took the exam
    totalCorrect: number; // Total number of correct answers across all attempts
}

/**
 * Represents data for question success rates.
 */
interface QuestionPercentage {
    exam_title: string; // Title of the exam the question belongs to
    question: string; // Text of the question
    totalCorrect: number; // Total number of correct answers for this question
    totalAttempt: number; // Total number of attempts for this question
}