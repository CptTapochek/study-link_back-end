import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    type: { type: String },
    name: { type: String, default: null },
    surname: { type: String, default: null },
    email: { type: String },
    photo: { type: String, default: null },
    password: { type: String },
    location: {
        type: {
            address: { type: String, default: null },
            phone: { type: String, default: null },
            country: { type: String, default: null },
            city: { type: String, default: null },
            state: { type: String, default: null },
            zip_code: { type: String, default: null },
        },
        default: null
    },
}, { versionKey: false });

const USER = await mongoose.model("users", UsersSchema);

export default USER;