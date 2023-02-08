import {MongoClient} from "mongodb";

export type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: number,
    blogName: string
}

export type BlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogs = [] as BlogsType[]
export const posts = [] as PostsType[]


const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"


const client = new MongoClient(mongoUri)
const db = client.db('bloggers')

export const blogsCollection = db.collection<BlogsType>('blogs')
export const postsCollection = db.collection<PostsType>('posts')


export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected successfully')
    } catch {
        console.log('! Not to connect to server')
        await client.close()
    }
}