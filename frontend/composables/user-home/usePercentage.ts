import type { SummaryScore } from "~/types";

export const usePercentage = (summary: Ref<SummaryScore>) => {
    let percentage = 0.00;
    let detail;
    let colors;
    let hexColor;
    let description;
    const correctAnswer = summary.value.correctAnswers;
    const totalQuestion = summary.value.totalQuestions;
    if (!correctAnswer || !totalQuestion) {
        return {
            percentage: 0.00,
            colors: 'red',
            hexColor: '#062d19',
            detail: 'The exam has not been taken yet'
        };
    }

    percentage = (correctAnswer / totalQuestion) * 100;
    // if (percentage >= 0.00 && percentage <= 50.99) {
    //     hexColor = '#ff4c51';
    //     detail = 'POOR';
    // } else if (percentage >= 51.00 && percentage <= 69.99) {
    //     hexColor = '#ffd966';
    //     detail = 'GOOD';
    // } else if (percentage >= 70.00 && percentage <= 89.99) {
    //     hexColor = '#00bad1';
    //     detail = 'VERY GOOD';
    // } else if (percentage >= 90.00 && percentage <= 100) {
    //     hexColor = '#28c76f';
    //     detail = 'EXCELLENT';
    // } else {
    //     hexColor = '#4b0406';
    //     detail = 'NOT EXAM YET';
    // }

    if (percentage >= 0.00 && percentage <= 50.99) {
        hexColor = '#ff4c51';
        description = "You have potential. More consistency will help you grow."
        colors = 'carnation';
        detail = 'POOR';
    } else if (percentage >= 51.00 && percentage <= 69.99) {
        description = "Good job! A little more effort will take you far."
        hexColor = '#ffd966';
        colors = 'yellow';
        detail = 'GOOD';
    } else if (percentage >= 70.00 && percentage <= 89.99) {
        description = "You're doing very well. Keep pushing your limits."
        hexColor = '#00bad1';
        colors = 'indigo';
        detail = 'VERY GOOD';
    } else if (percentage >= 90.00 && percentage <= 100) {
        description = "Outstanding performance! You've clearly prepared well."
        hexColor = '#28c76f';
        colors = 'primary';
        detail = 'EXCELLENT';
    } else {
        description = "";
        hexColor = '#4b0406';
        colors = 'red';
        detail = 'NOT EXAM YET';
    }


    return {
        description,
        hexColor,
        percentage,
        colors,
        detail
    }
}