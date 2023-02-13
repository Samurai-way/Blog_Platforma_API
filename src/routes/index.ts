import {Router} from "express";
import {blogsRouter} from "./blogsRouter";
import {postsRouter} from "./postsRouter";
import {testingRouter} from "./testingRouter";
import {authRouter} from "./authRouter";

export const routes = Router({})

routes.use('/auth', authRouter)
routes.use('/blogs', blogsRouter)
routes.use('/posts', postsRouter)
routes.use('/testing/all-data', testingRouter)