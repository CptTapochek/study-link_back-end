import COURSE from "../models/course.js";
import USER from "../models/user.js";


export async function getCoursesList(root) {
    let userId = root.userId;
    const user = await USER.findOne({ _id: userId });
    let courseList = [];

    if(user["type"] === "STUDENT") {
        courseList = await COURSE.find().select({
            "_id": 1, "title": 1, "processes": 1, "teacher": 1
        });
        for (let item of courseList) {
            item.progress = 0;
        }
    } else if(user["type"] === "TEACHER") {
        courseList = await COURSE.find({ "teacher._id": userId }).select({
            "_id": 1, "title": 1, "processes": 1, "teacher": 1
        });
        for (let item of courseList) {
            item.progress = 0;
        }
    }

    return courseList;
}

export async function getCourse(root) {
    let courseId = root.id;

    return "test";
}

export async function createCourse(root) {
    let input = root.input;
    const courseDraft = new COURSE(input);
    let response;

    try {
        await courseDraft.save().then(() => {
            response = {
                code: "200"
            };
        });
    } catch (error) {
        if (error) {
            response = {
                code: "400",
                error: error.toString()
            }
        }
        throw error;
    }

    return response;
}
