import * as mongoose from "mongoose";
import {
    AttemptsType,
    CommentDBModalType,
    DB_BlogsType,
    DB_PostsType,
    DB_User_Type,
    LikeStatus,
    RecoveryCodeType,
    TokenType,
    UserSessionsType
} from "./index";
import {ObjectId} from "mongodb";


export const BlogsSchema = new mongoose.Schema<DB_BlogsType>({
    id: String,
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: String,
    isMembership: Boolean
})

export const PostsSchema = new mongoose.Schema<DB_PostsType>({
    id: {type: String, required: true},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String, required: true},
    createdAt: String
})

export const CommentsSchema = new mongoose.Schema<CommentDBModalType>({
    _id: ObjectId,
    id: {type: String, required: true},
    content: {type: String, required: true},
    postId: {type: String, required: true},
    commentatorInfo: {
        userId: {type: String, required: true},
        userLogin: {type: String, required: true},
    },
    createdAt: {type: String, required: true},
    likesInfo: {
        likesCount: Number,
        dislikesCount: Number,
        myStatus: String
    }
})

export const UsersSchema = new mongoose.Schema<DB_User_Type>({
    id: String,
    _id: ObjectId,
    login: {type: String, required: true},
    passwordHash: String,
    email: {type: String, required: true},
    createdAt: String,
    emailConfirmation: {
        confirmationCode: String,
        expirationDate: Date,
        isConfirmed: Boolean
    }
})

export const TokensSchema = new mongoose.Schema<TokenType>({
    refreshToken: {type: String, required: true}
})

export const UsersSessionSchema = new mongoose.Schema<UserSessionsType>({
    ip: String,
    title: String,
    lastActiveDate: String,
    deviceId: String,
    userId: String,
})

export const AttemptsSchema = new mongoose.Schema<AttemptsType>({
    userIP: String,
    url: String,
    time: Date
})

export const RecoveryCodeSchema = new mongoose.Schema<RecoveryCodeType>({
    email: String,
    recoveryCode: String
})

export enum LikeStatusEnum  {
    Like = 'Like',
    Dislike = 'Dislike',
    None = 'None'
}

export const LikeStatusSchema = new mongoose.Schema<LikeStatus>({
    parentId: String,
    userId: String,
    login: String,
    addedAt: Date,
    likeStatus: {type: String, enum: LikeStatusEnum}
})