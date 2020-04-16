import {Document, Model} from 'mongoose'
import {Request} from 'express'


export enum Participants {
    user,
    provider
}

export interface IComment extends Document {
    author: {
        type: Participants;
        id: string // foreign key
    }
    text: string;
    datetime: string;
    evaluation?: number;
    relatedComment?: string // foreign key
}

export interface ICommentModel extends Model<IComment> {
    userCommentsCount: () => Promise<number>;
}

export interface ICreateCommentRequest extends Request {
    body: {
        text: string;
        datetime: string;
        evaluation?: number;
    }
    query: {
        hobbyId: string;
        relatedId: string;
    }
}

export interface ICommentInfo {
    userId: string;
    name: string;
    datetime: string;
    avatar: string;
    text: string;
    evaluation?: number;
    answer?: {
        providerId: string;
        name: string;
        datetime: string;
        avatar: string;
        text: string;
    }
}
