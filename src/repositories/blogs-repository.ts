type BlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogs = [] as BlogsType[]

export const blogsRepository = {
    getBlogs() {
        if(blogs){
            return blogs
        }
    }
}