import {blogsCollection, BlogsType} from "../db/db";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[]> {
        return blogsCollection.find({}).toArray()
    },
    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType | null> {
        let newBlog: BlogsType = {
            _id: String(+new Date()),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const result = await blogsCollection.insertOne(newBlog)
        if (result.insertedId) {
            return {
                _id: newBlog._id,
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt,
                isMembership: newBlog.isMembership
            }
        }
        return null
    },
    async getBlogById(id: string): Promise<BlogsType | null> {
        const blog: BlogsType | null = await blogsCollection.findOne({_id: id}, {projection: {id: false}})
        if (blog) {
            return blog
        } else {
            return null
        }
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({_id: id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id:id})
        return result.deletedCount === 1
    }
}