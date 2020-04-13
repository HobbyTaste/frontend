import {Schema} from 'mongoose'
import {IProvider} from "../types/provider";

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const PHONE_REG_EXP = /^\+\d{11}$/;


const ProviderSchema: Schema<IProvider> = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [PHONE_REG_EXP, 'Неверный формат']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [EMAIL_REG_EXP, 'Неверный формат email'],
    },
    info: {
        type: String,
        maxlength: 2000,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    comments: {
        type: [Schema.Types.ObjectId]
    }
});

export default ProviderSchema
