import * as dotenv from 'dotenv'
import * as mongoose from "mongoose";
import {
    AttemptsSchema,
    BlogsSchema,
    CommentsSchema,
    LikeStatusSchema,
    PostsSchema,
    RecoveryCodeSchema,
    TokensSchema,
    UsersSchema,
    UsersSessionSchema
} from "../types/mongooseShema";

dotenv.config()

const mongoUri = process.env.mongoURI || process.env.MONGO_URL

if (!mongoUri) {
    throw new Error('URL didnt found')
}

export const BlogsModel = mongoose.model('blogs', BlogsSchema)
export const PostsModel = mongoose.model('posts', PostsSchema)
export const CommentsModel = mongoose.model('comments', CommentsSchema)
export const UsersModel = mongoose.model('users', UsersSchema)
export const TokensModel = mongoose.model('tokens', TokensSchema)
export const UsersSessionModel = mongoose.model('usersSession', UsersSessionSchema)
export const AttemptsModel = mongoose.model('attempts', AttemptsSchema)
export const RecoveryCodeModel = mongoose.model('recoveryCode', RecoveryCodeSchema)
export const LikesStatusModel = mongoose.model('likesStatus', LikeStatusSchema)

export const runDb = async () => {
    try {
        await mongoose.connect(mongoUri, {dbName: 'bloggers'})
        console.log('Connected successfully')
    } catch {
        console.log('! Not to connect to server')
        await mongoose.disconnect()
    }
}

