import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    title: { type: String },
    processes: { type: Number, default: 0 },
    subjects: [
        {
            title: { type: String },
            type: { type: String },
            files: [
                {
                    title: { type: String },
                    type: { type: String },
                    size: { type: Number, default: 0 },
                    data: { type: String },
                }
            ],
            quiz_details: {
                type: {
                    max_score: { type: Number, default: 0 },
                    questions: [
                        {
                            title: { type: String },
                            type: { type: String },
                            responses: [
                                {
                                    title: { type: String, default: null },
                                    correct: { type: Boolean, default: false }
                                }
                            ],
                        }
                    ]
                },
                default: null
            }
        }
    ],
    teacher: {
        type: {
            _id: { type: String },
            name: { type: String, default: null },
            surname: { type: String, default: null },
            email: { type: String, default: null },
        }
    },
}, { versionKey: false });

const COURSE = await mongoose.model("courses", CourseSchema);

export default COURSE;