import COURSE from "../models/course.js";


export async function getCoursesList(root) {
    let userId = root.id;

    /*Test data*/
    let courses = [
        {
            id: "UASsdS4udh5wSSdu2d323",
            title: "Course_1",
            link: "Course_1_s23s4dad3re",
            progress: 0,
            processes: 12
        },
        {
            id: "feFF3r2iDsd8",
            title: "Course_2",
            link: "Course_2_hth455h",
            progress: 3,
            processes: 14
        },
        {
            id: "FGsdSud43hwSSdu2duj23",
            title: "Course_3",
            link: "Course_3_od32adDD",
            progress: 2,
            processes: 8
        }
    ];

    return courses;
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
        response = await courseDraft.save();
    } catch (error) {
        if (error) console.log(error);
        throw error;
    }

    return response;
}
