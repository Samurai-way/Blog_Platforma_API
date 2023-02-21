import * as mongoose from "mongoose";
import {DB_BlogsType} from "../db/db";

export const BlogsType = new mongoose.Schema<DB_BlogsType>({
    id: String,
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: String,
    isMembership: Boolean
})