import COURSE from "../models/course.js";
import QUIZ from "../models/quiz.js";
import GRADE from "../models/grade.js";
import USER from "../models/user.js";


export async function generateQuiz(root) {
    const userID = root.userId;
    const quizID = root.quizId;

    try {
        let quiz, quizResponse;
        const existedQuiz = await QUIZ.findOne({userId: userID, quizId: quizID});
        if(existedQuiz != null) {
            quizResponse = existedQuiz;
        } else {
            let response = await COURSE.findOne({"subjects._id": quizID});
            for(let i = 0; i < response["subjects"].length; i++) {
                if(response["subjects"][i]["type"] === "QUIZ" && response["subjects"][i]["_id"] == quizID){
                    let value = response["subjects"][i];
                    let questions = [];
                    for(let item of value["quiz_details"]["questions"]) {
                        let responses = [];
                        for (let response of item["responses"]) {
                            responses.push({
                                title: response["title"],
                                responseId: response["_id"]
                            });
                        }
                        questions.push({
                            questionId: item["_id"],
                            title: item["title"],
                            type: item["type"],
                            responses: responses
                        });
                    }
                    quiz = {
                        userId: userID,
                        quizId: quizID,
                        title: value["title"],
                        max_score: value["quiz_details"]["max_score"],
                        completed: false,
                        questions: questions,
                        score: 0,
                    }
                    const quizDraft = new QUIZ(quiz);
                    quizResponse = await quizDraft.save();
                }
            }
        }
        return quizResponse
    } catch (error) {
        if(error) { console.log("Error: ", error); }
        throw error;
    }
}


export async function submitQuiz(root) {
    const userID = root.input.userId;
    const quizID = root.input.quizId;
    const questions = root.input.questions;
    const draftQuestions = root.input["draft_questions"];
    let responseCode = "200";
    let errorMessage = "null";
    let score = 0;
    let approve = false;

    try {
        /* Get Course that contains this quiz and find quiz */
        const course = await COURSE.findOne({"subjects._id": quizID});
        const quiz = course["subjects"].find(subject => subject._id == quizID);
        /*  */
        for (let item of questions) {
            const question = quiz["quiz_details"]["questions"].find(quest => quest._id == item["_id"]);
            if(item["type"].toString() !== "TEXT_RESPONSE") {
                for(let resp of question["responses"]){
                    if (resp["correct"] === true){
                        for (let idx = 0; idx < item["correct_response_id"].length; idx++){
                            if(resp["_id"].toString() === item["correct_response_id"][idx]) {
                                score++;
                            }
                        }
                    }
                }
            } else if(item["type"].toString() === "TEXT_RESPONSE" && item["text_response"] != null) {
                if(item["text_response"].toString().length > 0){
                    score++;
                }
            }
        }
        if((score / quiz["quiz_details"]["max_score"]) > 0.5) {
            approve = true;
        }
        await QUIZ.update({userId: userID, quizId: quizID}, {
            completed: true,
            score: score,
            questions: draftQuestions
        });
        const student = await USER.findOne({ _id: userID });
        const newGrade = new GRADE({
            student: {
                student_id: userID,
                name: student["name"],
                surname: student["surname"],
            },
            quiz: {
                title: quiz["title"],
                max_score: quiz["quiz_details"]["max_score"],
                score: score
            },
            approve: approve
        });
        await newGrade.save();
    } catch (error) {
        /* Catch and return errors */
        if(error) {
            errorMessage = error;
            responseCode = "400";
            console.log("Error: ", error);
            return {code: responseCode, error: errorMessage};
        }
        throw error;
    }

    return {code: responseCode, error: errorMessage}
}