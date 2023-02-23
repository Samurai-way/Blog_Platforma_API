import {TestingDbRepository} from "../repositories/testing-db-repository";
import {TestingService} from "../domain/testing-service";
import {TestingController} from "../controllers/testingController";

const testingRepository = new TestingDbRepository()
const testingService = new TestingService(testingRepository)
export const testingController = new TestingController(testingService)