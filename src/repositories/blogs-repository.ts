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
    },
    getBlogById(id: number) {
        if (id) {
            const findBlog = blogs.find(b => b.id === id)
            return findBlog
        }
    },
    updateBlogById(id: number, name: string, description: string, websiteUrl: string) {
        const blog = blogs.find(b => b.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },
    deleteBlog(id: number) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
            }
        }
        return false
    }
}