import {body, query} from "express-validator";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {blogsRepository} from "../repositories/blogs-db-repository";


export const name = body('name')
    .trim()
    .isLength({min: 1, max: 15})
    .withMessage('name maxLength: 15')
export const description = body('description')
    .trim()
    .isLength({
        min: 1,
        max: 500
    }).withMessage('description maxLength: 500')
export const websiteUrl = body('websiteUrl')
    .trim()
    .isLength({
        min: 1,
        max: 100
    })
    .matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .withMessage('description maxLength: 500')
export const title = body('title').trim()
    .isLength({min: 1, max: 30})
    .withMessage('title maxLength: 30')
    .isString()
export const shortDescription = body('shortDescription')
    .trim()
    .isLength({
        min: 1,
        max: 100
    })
    .withMessage('shortDescription maxLength: 100')
    .isString()
export const content = body('content')
    .trim()
    .isLength({
        min: 1,
        max: 1000
    }).withMessage('content maxLength: 1000')
    .isString()
export const blogId = body('blogId')
    .custom(async (value, {req}) => {
        const blogId = req.body.blogId
        if (!blogId) {
            throw new Error('not blogId');
        }
        const findBlog = await blogsRepository.getBlogById(blogId)
        if (!findBlog) {
            throw new Error('not blogId');
        }
        return true;
    }).withMessage('blogId')
export const pageNumber = query('pageNumber')
    .default(1)
    .toInt(10)
export const pageSize = query('pageSize')
    .default(10)
    .toInt(10)
export const sortBy = query('sortBy')
    .default('createdAt')
    .trim()
export const sortDirection = query('sortDirection')
    .default('desc')
    .trim()
const searchNameTerm = query('searchNameTerm')
    .default('')
    .trim()
const searchLoginTerm = query('searchLoginTerm')
    .default('')
    .trim()
const searchEmailTerm = query('searchLoginTerm')
    .default('')
    .trim()

const login = body('login').trim().isLength({min: 3, max: 10}).matches('^[a-zA-Z0-9_-]*$')
const password = body('password').trim().isLength({min: 6, max: 20})
const email = body('email').trim().isEmail()

export const usersGetValidator = [sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm, ExpressErrorValidator]
export const userPostValidator = [login, password, email, basicAuthMiddleware, ExpressErrorValidator]
export const getBlogsPaginationValidator = [searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, ExpressErrorValidator]
export const getPostsPaginationValidator = [pageNumber, pageSize, sortBy, sortDirection, ExpressErrorValidator]
export const paginationValidator = [pageNumber, pageSize, sortBy, sortDirection, ExpressErrorValidator]
export const postBlogValidator = [name, description, websiteUrl, basicAuthMiddleware, ExpressErrorValidator]
export const postPostsValidator = [title, shortDescription, content, blogId, basicAuthMiddleware, ExpressErrorValidator]
export const postBlogPostsValidator = [title, shortDescription, content, basicAuthMiddleware, ExpressErrorValidator]