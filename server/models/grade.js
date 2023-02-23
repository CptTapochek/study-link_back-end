import mongoose from "mongoose";

const Schema = mongoose.Schema;
const GradeSchema = new Schema({
    student: {
        student_id: { type: String },
        name: { type: String, default: null },
        surname: { type: String, default: null },
    },
    quiz: {
        title: { type: String, default: null },
        max_score: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
    },
    course_title: { type: String, default: null },
    approve: { type: Boolean, default: false },
    date: {
        year: { type: String },
        month: { type: String },
        day: { type: String },
    },
}, { versionKey: false });

const GRADE = await mongoose.model("grades", GradeSchema);

export default GRADE;