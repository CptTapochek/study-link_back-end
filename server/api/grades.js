import GRADE from "../models/grade.js";


export async function getGrades(root) {
    const userId = root.userId;
    let response = [];

    const grades = await GRADE.find({ "student.student_id": userId });
    for (let item of grades) {
        response.push({
            courseTitle: (await item).course_title,
            quizTitle: (await item).quiz.title,
            maxScore: (await item).quiz.max_score,
            score: (await item).quiz.score,
            approve: (await item).approve,
            date: (await item).date
        });
    }

    return response;
}