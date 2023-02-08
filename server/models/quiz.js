import mongoose from "mongoose";

const Schema = mongoose.Schema;
const QuizSchema = new Schema({
    title: { type: String },
    userId: { type: String },
    quizId: { type: String },
    max_score: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    questions: [
        {
            questionId: { type: String },
            title: { type: String },
            type: { type: String },
            responses: [
                {
                    responseId: { type: String },
                    title: { type: String, default: null },
                    chosen: { type: Boolean, default: false }
                }
            ],
        }
    ]
}, { versionKey: false });

const QUIZ = await mongoose.model("quiz", QuizSchema);

export default QUIZ;