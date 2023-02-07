type BlogsType = {
    id: string,
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
            id: Math.random().toString(),
            name,
            description,
            websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },
    getBlogById(id: string) {
        if (id) {
            const findBlog = blogs.find(b => b.id === id)
            return findBlog
        }
    },
    updateBlogById(id: string, name: string, description: string, websiteUrl: string) {
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
    deleteBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1)
                return true
            }
        }
        return false
    }
}