import {Router} from "express";
import {blogsRouter} from "./blogsRouter";
import {postsRouter} from "./postsRouter";
import {testingRouter} from "./testingRouter";
import {authRouter} from "./authRouter";
import {usersRouter} from "./usersRouter";
import {commentsRouter} from "./commentsRouter";
import {securityDevicesRouter} from "./securityDevicesRouter";

export const routes = Router({})

routes.use('/auth', authRouter)
routes.use('/security', securityDevicesRouter)
routes.use('/users', usersRouter)
routes.use('/blogs', blogsRouter)
routes.use('/posts', postsRouter)
routes.use('/comments', commentsRouter)
routes.use('/testing/all-data', testingRouter)