import {Document, Model} from 'mongoose'

export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    avatar: string;
    hobbies: string[]; // foreign key
    comments: string[]; // foreign key
    checkPasswords(candidatePassword: string): Promise<boolean>
    repr(): Promise<IUserInfo>
}

export interface IUserInfo {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface IUserModel extends Model<IUser>{}
