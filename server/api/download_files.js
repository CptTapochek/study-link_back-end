import COURSE from "../models/course.js";


export async function downloadFile(root) {
    const courseId = root.courseId;
    const fileId = root.fileId;

    let response = [];

    const course = await COURSE.find({ _id: courseId });


    return response;
}