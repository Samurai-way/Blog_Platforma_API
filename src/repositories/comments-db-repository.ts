import {CommentsModel, LikesStatusModel} from "../db/db";
import {DB_User_Type} from "../types";
import mongoose from "mongoose";
import {LikeStatusEnum} from "../types/mongooseShema";


export class CommentsRepository {
    async findAndSortedComments(pageNumber: number, pageSize: number, sortBy: any, sortDirection: any, postID: string) {
        return CommentsModel
            .find({postId: postID}, {_id: 0, postId: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()
    }

    async getCountCollection(postID: string) {
        return CommentsModel.countDocuments({postId: postID})
    }

    async getLikes(id: string) {
        return LikesStatusModel.countDocuments({parentId: id, likeStatus: 'Like'})
    }

    async getDislikes(id: string) {
        return LikesStatusModel.countDocuments({parentId: id, likeStatus: 'Dislike'})
    }

    async getStatus(id: string, userId: string) {
        return LikesStatusModel.findOne({parentId: id, userId})
    }

    async getCommentById(id: string) {
        return CommentsModel.findOne({id}, {_id: 0, postId: 0, __v: 0})
    }

    async getCommentByIdWithLikes(id: string, userId: string | mongoose.Types.ObjectId) {
        const result = await CommentsModel.aggregate([
            {$match: {id}},
            {
                $lookup: {
                    from: 'likesstatuses',
                    localField: 'id',
                    foreignField: 'parentId',
                    pipeline: [
                        {$match: {likeStatus: LikeStatusEnum.Like}}], as: 'Likes',
                },
            },
            {
                $lookup: {
                    from: 'likesstatuses',
                    localField: 'id',
                    foreignField: 'parentId',
                    pipeline: [
                        {
                            $match: {
                                likeStatus: LikeStatusEnum.Dislike
                            },
                        },
                    ],
                    as: 'Dislikes',
                },
            },
            {
                $lookup: {
                    from: 'likesstatuses',
                    localField: 'id',
                    foreignField: 'parentId',
                    pipeline: [
                        {
                            $match: {userId: userId ?? ''},
                        },
                        {
                            $project: {_id: 0, likeStatus: 1},
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
                    commentatorInfo: true,
                    userId: true,
                    userLogin: true,
                    createdAt: true,
                    'likesInfo.likesCount': {$size: '$Likes'},
                    'likesInfo.dislikesCount': {$size: '$Dislikes'},
                    'likesInfo.likeStatus': {
                        $cond: {
                            if: {$eq: [{$size: '$likeStatus'}, 0]},
                            then: 'None',
                            else: '$likeStatus.likeStatus',
                        },
                    },
                },
            },
            {$unwind: '$likesInfo.likeStatus'}
        ])
        return result[0];
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
