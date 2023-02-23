import {EmailRepository} from "../repositories/email-repository";

export class EmailService {
    constructor(protected emailRepository: EmailRepository) {
    }
    async sendEmail(email: string, subject: string, message: string) {
        return this.emailRepository.sendEmail(email, subject, message)
    }
}

