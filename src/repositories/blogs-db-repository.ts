import {blogs, blogsCollection, BlogsType} from "../db/db";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[] | undefined> {
        if (blogs) return blogsCollection.find({}).toArray()
    },
    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
        const newBlog: BlogsType = {
            id: String(+(new Date())),
            name,
            description,
            websiteUrl
        }
        const result = await blogsCollection.insertOne(newBlog)
        return newBlog
    },
    async getBlogById(id: string) {
        const blog: BlogsType | null = await blogsCollection.findOne({id: id})
        if (blog) {
            return blog
        } else {
            return null
        }
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({id: id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}