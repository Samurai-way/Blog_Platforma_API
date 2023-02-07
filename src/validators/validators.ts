import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const name = body('name').trim().isLength({min: 1, max: 15}).withMessage('name maxLength: 15')
export const description = body('description').trim().isLength({min: 1, max: 500}).withMessage('description maxLength: 500')
export const websiteUrl = body('websiteUrl').trim().isLength({min: 1, max: 100}).withMessage('description maxLength: 500')

export const postValidator = [name, description, websiteUrl, inputValidationMiddleware]