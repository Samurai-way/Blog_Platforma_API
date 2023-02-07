import {Router} from "express";
import {blogsRouter} from "./blogsRouter";
import {postsRouter} from "./postsRouter";

export const routes = Router({})

routes.use('/blogs', blogsRouter)
routes.use('/posts', postsRouter)