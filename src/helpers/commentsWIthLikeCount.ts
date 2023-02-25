import {LikesStatusModel} from "../db/db";

export const commentsWIthLikeCount = async (findAndSortedComment: any, userId: string | undefined) => {
    console.log('findAndSortedComment', findAndSortedComment)
    let postsWithCommentLikes = []
    for (let comment of findAndSortedComment) {
        const findLikes = await LikesStatusModel.countDocuments({parentId: comment.id, likeStatus: 'Like'})
        const findDislikes = await LikesStatusModel.countDocuments({parentId: comment.id, likeStatus: 'Dislike'})
        const findCommentWithLikesByUserId = await LikesStatusModel.findOne({parentId: comment.id, userId})

        comment.likesInfo.likesCount = findLikes
        comment.likesInfo.dislikesCount = findDislikes

        if (findCommentWithLikesByUserId) {
            comment.likesInfo.myStatus = findCommentWithLikesByUserId.likeStatus
        }
        postsWithCommentLikes.push(comment)
    }
    return postsWithCommentLikes
}