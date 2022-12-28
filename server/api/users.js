import USER from "../models/user.js";
import * as dotenv from "dotenv";

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