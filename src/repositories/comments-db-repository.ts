import {paginator} from "../helpers/pagination";
import {CommentsModel} from "../db/db";
import {DB_User_Type} from "../types";

export class CommentsRepository {
    async getComments(postID: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: any) {
        const findAndSortedComments = await CommentsModel
            .find({postId: postID}, {_id: 0, postId: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()
        const getCountComments = await CommentsModel.countDocuments({postId: postID})
        return paginator(pageNumber, pageSize, getCountComments, findAndSortedComments)
    }
    async getCommentById(id: string) {
        return CommentsModel.findOne({id}, {_id: 0, postId: 0, __v: 0})
    }
    async deleteCommentByID(commentID: string, user: DB_User_Type): Promise<boolean> {
        const result = await CommentsModel.deleteOne({id: commentID, 'commentatorInfo.userId': user.id})
        return result.deletedCount === 1
    }
    async updateCommentById(commentId: string, content: string, user: DB_User_Type): Promise<boolean> {
        const result = await CommentsModel.updateOne({id: commentId, 'commentatorInfo.userId': user.id}, {
            $set: {content}
        })
        return result.matchedCount === 1
    }
}
