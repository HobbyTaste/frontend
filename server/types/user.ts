import {Document, Model} from 'mongoose'

export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    avatar: string;
    hobbies: string[]; // foreign key
    comments: string[]; // foreign key
    checkPasswords(candidatePassword: string): Promise<boolean>
}

export interface IUserModel extends Model<IUser>{}

