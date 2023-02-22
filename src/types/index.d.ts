import {DB_User_Type} from "../db/db";
import {ObjectId} from "mongodb";

export class BlogsType {
    constructor(public id: string,
                public name: string,
                public description: string,
                public websiteUrl: string,
                public createdAt: string,
                public isMembership: boolean) {
    }
}

export class RecoveryCodeType {
    constructor(public email: string,
                public recoveryCode: string) {

    }
}

export class TokenType {
    constructor(public refreshToken: string) {

    }
}

export class PostsType {
    constructor(public id: string,
                public _id: ObjectId,
                public title: string,
                public shortDescription: string,
                public content: string,
                public blogId: string,
                public blogName: string,
                public createdAt: string) {
    }
}

export class UserType {
    constructor(public id: string,
                public login: string,
                public email: string,
                public createAt: string) {
    }
}

export class DB_User_Type {
    constructor(public id: string,
                public _id: ObjectId,
                public login: string,
                public passwordHash: string,
                public email: string,
                public createdAt: string,
                public emailConfirmation: {
                    confirmationCode: string,
                    expirationDate: Date,
                    isConfirmed: boolean
                }) {

    }
}

export class DB_PostsType {
    constructor(public id: string,
                public title: string,
                public shortDescription: string,
                public content: string,
                public blogId: string,
                public blogName: string,
                public createdAt: string) {

    }
}

export class DB_BlogsType {
    constructor(public _id: ObjectId,
                public id: string,
                public name: string,
                public description: string,
                public websiteUrl: string,
                public createdAt: string,
                public isMembership: boolean) {
    }
}

export class CommentsType {
    constructor(public id: string,
                public content: string,
                public commentatorInfo: {
                    userId: string,
                    userLogin: string
                },
                public createdAt: string) {

    }
}

export class CommentDBModalType {
    constructor(public _id: ObjectId,
                public id: string,
                public content: string,
                public postId: string,
                public commentatorInfo: {
                    userId: string
                    userLogin: string
                },
                public createdAt: string) {

    }
}

export class AttemptsType {
    constructor(public userIP: string,
                public url: string,
                public time: Date) {

    }
}

export class UserSessionsType {
    constructor(public ip: string,
                public title: string,
                public lastActiveDate: string,
                public deviceId: string,
                public userId: string,) {

    }
}


declare global {
    declare namespace Express {
        export interface Request {
            user: DB_User_Type | null
            deviceId: string | null
        }
    }
}