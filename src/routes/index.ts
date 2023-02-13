import {Router} from "express";
import {blogsRouter} from "./blogsRouter";
import {postsRouter} from "./postsRouter";
import {testingRouter} from "./testingRouter";
import {authRouter} from "./authRouter";
import {usersRouter} from "./usersRouter";

export const routes = Router({})

routes.use('/auth', authRouter)
routes.use('/users', usersRouter)
routes.use('/blogs', blogsRouter)
routes.use('/posts', postsRouter)
routes.use('/testing/all-data', testingRouter)