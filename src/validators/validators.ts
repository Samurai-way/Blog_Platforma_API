import {body, query} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
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
    .default(null)
    .trim()
const login = body('login').trim().isLength({min: 3, max: 10}).matches("^[a-zA-Z0-9_-]*$")
    .withMessage('login error')
const password = body('password').trim().isLength({min: 6, max: 20}).withMessage('password error')
const email = body('email').trim().isEmail().matches("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$\n").withMessage('email error')
export const userPostValidator = [login, password, email, basicAuthMiddleware, inputValidationMiddleware]
export const getBlogsPaginationValidator = [searchNameTerm, sortBy, sortDirection, pageNumber, pageSize, inputValidationMiddleware]
export const getPostsPaginationValidator = [pageNumber, pageSize, sortBy, sortDirection, inputValidationMiddleware]
export const paginationValidator = [pageNumber, pageSize, sortBy, sortDirection, inputValidationMiddleware]
export const postBlogValidator = [name, description, websiteUrl, basicAuthMiddleware, inputValidationMiddleware]
export const postPostsValidator = [title, shortDescription, content, blogId, basicAuthMiddleware, inputValidationMiddleware]
export const postBlogPostsValidator = [title, shortDescription, content, basicAuthMiddleware, inputValidationMiddleware]