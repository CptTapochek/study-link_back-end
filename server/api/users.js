import USER from "../models/user.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import COURSE from "../models/course.js";

dotenv.config();

export async function login(root) {
    const email = root.email;
    const password = root.password;
    const user = await USER.findOne({ email: email });
    let response;

    if(user != null) {
        if(user["password"] != password) {
            response = {error: "The email or password is incorrect"};
        } else {
            response = user;
        }
    } else {
        response = {error: "The email or password is incorrect"};
    }
    return response;
}


export async function SignUp(root) {
    const input = root.input;
    const userDraft = new USER(input);
    let response;

    const existEmail = await USER.findOne({ email: userDraft.email });
    if(existEmail != null) {
        response = {error: "User with similar email already exists."}
    } else {
        response = await userDraft.save();
    }

    return response;
}

export async function dashboardData(root) {
    try {
        const userId = root.userId;
        const progress = getRandomInt(100);
        const students = await USER.where({"type": "STUDENT"}).count();
        const teachers = await USER.where({"type": "TEACHER"}).count();
        const courses = await COURSE.count();

        return {
            "students": students,
            "teachers": teachers,
            "courses": courses,
            "progress": progress,
        };
    } catch (error) {
        console.log(error)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export async function CheckIfTokenIsValid(root) {
    const token = root.token;
    let response = false;
    await jwt.verify(
        token,
        process.env.PRIVATE_KEY,
        { algorithms: ['SH256'] },
        function(err, decoded) {
            response = !(err || decoded === undefined);
        }
    );
    return response;
}