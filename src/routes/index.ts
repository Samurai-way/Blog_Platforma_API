import {Router} from "express";
import {blogsRouter} from "./blogsRouter";
import {postsRouter} from "./postsRouter";
import {testingRouter} from "./testingRouter";

export const routes = Router({})

routes.use('/blogs', blogsRouter)
routes.use('/posts', postsRouter)
routes.use('/testing/all-data', testingRouter)