import {paginator} from "../helpers/pagination";
import {CommentsModel, LikesStatusModel} from "../db/db";
import {DB_User_Type} from "../types";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";

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
    async getLikes(id: string){
        return LikesStatusModel.countDocuments({parentId: id, likeStatus: 'Like'})
    }
    async getDislikes(id: string){
        return LikesStatusModel.countDocuments({parentId: id, likeStatus: 'Dislike'})
    }
    async getStatus(id: string, userId: string){
        return LikesStatusModel.findOne({parentId: id, userId})
    }
    async getCommentById(id: string) {
        return CommentsModel.findOne({id}, {_id: 0, postId: 0, __v: 0}).lean()
    }
    async getCommentByIdWithLikes(id: string, userId: string | mongoose.Types.ObjectId) {
        const result = await LikesStatusModel.aggregate([
            {$match: {parentId: id}},
            {
                $lookup: {
                    from: 'likesstatuses',
                    localField: 'id',
                    foreignField: 'parentId',
                    pipeline: [
                        {$match: {likeStatus: 'Dislike'},},], as: 'likesCount',
                },
            },
        {
            $lookup: {
                from: 'reactions',
                localField: 'id',
                foreignField: 'parentId',
                pipeline: [
                    {
                        $match: {
                            likeStatus: 'Dislike'
                        },
                    },
                    { $count: 'count' },
                ],
                as: 'dislikesCount',
            },
        },
        {
            $lookup: {
                from: 'reactions',
                localField: 'id',
                foreignField: 'parentId',
                pipeline: [
                    {
                        $match: { userId: userId ?? '' },
                    },
                    {
                        $project: { _id: 0, reactionStatus: 1 },
                    },
                ],
                as: 'myStatus',
            },
        },
        {
             $project: {
                _id: 0,
                id: true,
                content: true,
                userId: true,
                userLogin: true,
                createdAt: true,
                'likesInfo.likesCount': { $size: '$likesCount' },
                'likesInfo.dislikesCount': { $size: '$dislikesCount' },
                'likesInfo.myStatus': {
                    $cond: {
                        if: { $eq: [{ $size: '$myStatus' }, 0] },
                        then: 'None',
                        else: '$myStatus.reactionStatus',
                    },
                },
            },}])
        console.log('result', result)
        return result;
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
