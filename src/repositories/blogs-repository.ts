type BlogsType = {
    id: string | number,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogs = [] as BlogsType[]

export const blogsRepository = {
    getBlogs() {
        if (blogs) {
            return blogs
        }
    },
    createBlog(name: string, description: string, websiteUrl: string) {
        const newBlog: BlogsType = {
            id: +(new Date()),
            name,
            description,
            websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    }
}