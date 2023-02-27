import {TestingDbRepository} from "../repositories/testing-db-repository";
import {TestingService} from "../domain/testing-service";
import {TestingController} from "../controllers/testingController";
import {Container} from "inversify";

// const testingRepository = new TestingDbRepository()
// const testingService = new TestingService(testingRepository)
// export const testingController = new TestingController(testingService)

export const container = new Container()
container.bind(TestingController).to(TestingController)
container.bind(TestingService).to(TestingService)
container.bind(TestingDbRepository).to(TestingDbRepository)