import {emailRepository} from "../repositories/email-repository";

class EmailService {
    async sendEmail(email: string, subject: string, message: string) {
        return await emailRepository.sendEmail(email, subject, message)
    }
}

export const emailService = new EmailService()