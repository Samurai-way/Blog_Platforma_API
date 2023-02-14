import {commentsCollection, DB_User_Type} from "../db/db";
import {paginator} from "../helpers/pagination";

export const commentsRepository = {
    async getComments(postID: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: any) {
        const findAndSortedComments = await commentsCollection
            .find({postId: postID}, {projection: {_id: 0, postId: 0}})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountComments = await commentsCollection.countDocuments({})
        return paginator(pageNumber, pageSize, getCountComments, findAndSortedComments)
    },
    async getCommentById(id: string) {
        return await commentsCollection.findOne({id}, {projection: {_id: 0}})
    },
    async deleteCommentByID(commentID: string, user: DB_User_Type): Promise<boolean> {
        const result = await commentsCollection.deleteOne({id: commentID})
        return result.deletedCount === 1
    },
    async updateCommentById(commentId: string, content: string, user: DB_User_Type): Promise<boolean> {
        const result = await commentsCollection.updateOne({id: commentId, userId: user.id}, {
            $set: {content}
        })
        return result.matchedCount === 1
    }
}