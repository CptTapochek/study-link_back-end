import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    title: { type: String },
    link: { type: String },
    progress: { type: Number, default: null },
    processes: { type: Number, default: null },
    subjects: [
        {
            title: { type: String },
            type: { type: String },
            files: [
                {
                    title: { type: String },
                    type: { type: String },
                    download_link: { type: String, default: null },
                }
            ],
            quiz_details: {
                type: {
                    completed: { type: Boolean },
                    result: { type: String, default: null },
                    score: { type: Number, default: null },
                    max_score: { type: Number, default: null },
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
    students: [
        {
            type: {
                _id: { type: String },
                name: { type: String, default: null },
                surname: { type: String, default: null },
                email: { type: String, default: null }
            },
            default: null
        }
    ]
}, { versionKey: false });

const COURSE = await mongoose.model("courses", CourseSchema);

export default COURSE;