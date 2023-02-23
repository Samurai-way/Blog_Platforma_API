import {LikesStatusModel} from "../db/db";

export class LikeStatusRepository {
    async updateLikeStatusByCommentId(commentId: string, userId: string, login: string, likeStatus: string,) {
        const commentLikeStatus = {
            parentId: commentId,
            userId,
            login,
            addedAt: new Date(),
            likeStatus
        }
        const updateLikeStatus = await LikesStatusModel.findOneAndUpdate({parentId: commentId, userId}, {...commentLikeStatus}, {upsert: true})
        console.log('updateLikeStatus', updateLikeStatus)
        return updateLikeStatus
    }
}