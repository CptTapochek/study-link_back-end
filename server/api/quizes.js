import COURSE from "../models/course.js";
import QUIZ from "../models/quiz.js";


export async function generateQuiz(root) {
    const userID = root.userId;
    const quizID = root.quizId;

    try {
        let quiz, quizResponse;
        const existedQuiz = await QUIZ.findOne({quizId: quizID});
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
        if(error) {
            console.log("Error: ", error);
        }
        throw error;
    }
}