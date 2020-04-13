import {Document} from 'mongoose'
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
    relatedComment: string // foreign key
}

export interface ICreateCommentRequest extends Request {
    body: {
        text: string;
        datetime: string;
        evaluation?: number;
    }
    query: string; // hobbyId if userComment or commentId if providerComment
}
