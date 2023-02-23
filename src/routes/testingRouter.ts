import {Router} from "express";
import {testingController} from "../compositions/testingComposition";


export const testingRouter = Router({})
testingRouter.delete('/', testingController.delete.bind(testingController))
