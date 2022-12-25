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

    /* Test Data */
    let course = [
        {
            id: "UASsdS4udh5wSSdu2d323",
            title: "Course_1",
            link: "Course_1_s23s4dad3re",
            progress: 0,
            processes: 12,
            subjects: [
                {
                    id: "fff4fSAF44F3",
                    title: "Subject_1",
                    type: "LEARN",
                    files: [
                        {
                            id: "FIEF332f3",
                            title: "file_1",
                            type: "pdf",
                            download_link: "ssd232FFF32rg"
                        }
                    ]
                },
                {
                    id: "ht2rt33SfFF3",
                    title: "Quiz_1",
                    type: "QUIZ",
                    quiz_details: {
                        completed: true,
                        result: "pass",
                        score: 67,
                        max_score: 100
                    }
                }
            ]
        }
    ];

    return course;
}

export async function createCourse(root) {
    let input = root.input;
    const generatedId = Date.now().toString();
    input["_id"] = generatedId;
    const courseDraft = new COURSE(input);
    let response;

    try {
        await courseDraft.save(function (error){
            if (error) console.log(error);
        });
    } catch (error) {
        if (error) console.log(error);
        throw error;
    }

    response = await COURSE.findOne({_id: generatedId});

    return response;
}
