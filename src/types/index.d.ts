import {DB_User_Type} from "../db/db";
import {ObjectId} from "mongodb";

export type TokenType = {
    refreshToken: string
}


export type PostsType = {
    id: string,
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}


export type UserType = {
    id: string
    login: string
    email: string
    createAt: string
}


export type DB_User_Type = {
    id: string,
    _id: ObjectId,
    login: string,
    passwordHash: string,
    email: string,
    createdAt: string,
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date,
        isConfirmed: boolean
    }


}

export type DB_PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type DB_BlogsType = {
    _id: ObjectId
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type BlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type CommentsType = {
    id: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    },
    createdAt: string
}

export type CommentDBModalType = {
    _id: ObjectId,
    id: string,
    content: string,
    postId: string
    commentatorInfo: {
        userId: string
        userLogin: string
    },
    createdAt: string
}


export type AttemptsType = {
    userIP: string
    url: string
    time: Date
}

export type UserSessionsType = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string,
    userId: string,
}

declare global {
    declare namespace Express {
        export interface Request {
            user: DB_User_Type | null
            deviceId: string | null
        }
    }
}