export type PostsType = {
    id: string | number,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

const posts = [] as PostsType[]

export const postsRepository = {
    getPosts() {
        if (posts) {
            return posts
        }
    },
    createPost(title: string, shortDescription: string, content: string, blogId: string) {
        const newPost: PostsType = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'first'
        }
        posts.push(newPost)
        return newPost
    },
    getPostById(id: number) {
        if (id) {
            const findPost = posts.find(p => p.id === id)
            return findPost
        }
    },
    updatePostById(id: number, title: string, shortDescription: string, content: string, blogId: string) {
        const findPost = posts.find(p => p.id === id)
        if (findPost) {
            findPost.title = title
            findPost.shortDescription = shortDescription
            findPost.content = content
            findPost.blogId = blogId
            return true
        } else {
            return false
        }
    },
    deletePostById(id: number) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    }
}