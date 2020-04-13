import {IUserModel} from "../types/user";
import {Schema} from 'mongoose'

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const UserSchema: Schema<IUserModel> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [EMAIL_REG_EXP, 'Неверный формат email'],
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    hobbies: {
        type: [Schema.Types.ObjectId],
    },
    comments: {
        type: [Schema.Types.ObjectId]
    }
});

export default UserSchema
