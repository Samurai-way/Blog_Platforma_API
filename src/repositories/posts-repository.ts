export type PostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: number,
    blogName: string
}

const posts = [] as PostsType[]

export const postsRepository = {
    getPosts() {
        if (posts) {
            return posts
        }
    },
    createPost(title: string, shortDescription: string, content: string, blogId: number) {
        const newPost: PostsType = {
            id: Math.random().toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'first'
        }
        posts.push(newPost)
        return newPost
    },
    getPostById(id: string) {
        if (id) {
            const findPost = posts.find(p => p.id === id)
            return findPost
        }
    },
    updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: number) {
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
    deletePostById(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    }
}