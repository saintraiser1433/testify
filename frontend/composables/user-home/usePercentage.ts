import type { SummaryScore } from "~/types";

export const usePercentage = (summary: Ref<SummaryScore>) => {
    let percentage = 0.00;
    let detail;
    let hexColor;
    const correctAnswer = summary.value.correctAnswers;
    const totalQuestion = summary.value.totalQuestions;
    if (!correctAnswer || !totalQuestion) {
        return {
            percentage: 0.00,
            hexColor: '#4b0406',
            detail: detail = 'POOR'
        };
    }

    percentage = (correctAnswer / totalQuestion) * 100;
    if (percentage >= 0.00 && percentage <= 50.99) {
        hexColor = '#ff4c51';
        detail = 'POOR';
    } else if (percentage >= 51.00 && percentage <= 69.99) {
        hexColor = '#8482f7';
        detail = 'GOOD';
    } else if (percentage >= 70.00 && percentage <= 89.99) {
        hexColor = '#00bad1';
        detail = 'VERY GOOD';
    } else if (percentage >= 90.00 && percentage <= 100) {
        hexColor = '#28c76f';
        detail = 'EXCELLENT';
    } else {
        hexColor = '#4b0406';
        detail = 'NOT EXAM YET';
    }


    return {
        percentage,
        hexColor,
        detail
    }
}