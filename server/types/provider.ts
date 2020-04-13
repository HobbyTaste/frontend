import {Document} from 'mongoose'

export interface IProvider extends Document {
    name: string;
    password: string;
    email: string;
    avatar: string;
    phone: string;
    info: string;
    comments: string[]; // foreign key
    checkPasswords(candidatePassword: string): Promise<boolean>
}
