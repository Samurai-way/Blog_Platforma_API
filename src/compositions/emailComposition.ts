import {EmailRepository} from "../repositories/email-repository";
import {EmailService} from "../domain/email-service";

const emailRepository = new EmailRepository()
export const emailService = new EmailService(emailRepository)
