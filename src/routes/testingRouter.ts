import {Router} from "express";
import {container} from "../compositions/testingComposition";
import {TestingController} from "../controllers/testingController";


const testingController = container.resolve(TestingController)
export const testingRouter = Router({})
testingRouter.delete('/', testingController.delete.bind(testingController))
