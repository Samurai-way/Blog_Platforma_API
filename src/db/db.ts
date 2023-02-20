import {MongoClient, ObjectId} from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config()

export type TokenType = {
    refreshToken: string
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

export type UsersType = {
    id: string,
    _id: ObjectId,
    login: string,
    passwordHash: string
    email: string,
    createdAt: string

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
    time: string
}

export type UserSessionsType = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string,
    userId: string,
}

export const blogs = [] as BlogsType[]
export const posts = [] as PostsType[]


const mongoUri = process.env.mongoURI || process.env.MONGO_URL

if (!mongoUri) {
    throw new Error('URL didnt found')
}
const client = new MongoClient(mongoUri)
const db = client.db('bloggers')

export const blogsCollection = db.collection<BlogsType>('blogs')
export const postsCollection = db.collection<PostsType>('posts')
export const usersCollection = db.collection<DB_User_Type>('users')
export const usersSessionCollection = db.collection<UserSessionsType>('usersSessionCollection')

export const attemptsCollection = db.collection<AttemptsType>('attemptsCollection')
export const commentsCollection = db.collection<CommentsType>('comments')
export const tokensCollection = db.collection<TokenType>('tokens')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully')
    } catch {
        console.log('! Not to connect to server')
        await client.close()
    }
}

