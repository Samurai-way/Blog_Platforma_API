import {LikesStatusModel} from "../db/db";

export const postsWithLikeStatus = async (findAndSortedPost: any, userId: string) => {
    let postWithLikeStatus = []
    for (const post of findAndSortedPost) {
        const likesCount = await LikesStatusModel.countDocuments({parentId: post.id, likeStatus: 'Like'})
        const DislikesCount = await LikesStatusModel.countDocuments({parentId: post.id, likeStatus: 'Dislike'})
        const FindCountWithLikesByUserId = await LikesStatusModel.findOne({parentId: post.id, userId})
        const getNewestPost = await LikesStatusModel.find({parentId: post.id, likeStatus: 'Like'}, {
            _id: 0,
            __v: 0,
            parentId: 0,
            likeStatus: 0
        }, {sort: {_id: -1}, limit: 3})

        post.extendedLikesInfo.likesCount = likesCount
        post.extendedLikesInfo.dislikesCount = DislikesCount
        post.extendedLikesInfo.newestLikes = getNewestPost

        if (FindCountWithLikesByUserId) {
            post.extendedLikesInfo.myStatus = FindCountWithLikesByUserId.likeStatus
        } else {
            post.extendedLikesInfo.myStatus = 'None'
        }
        postWithLikeStatus.push(post)
    }
    return postWithLikeStatus
}