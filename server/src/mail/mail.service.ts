import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";

@Injectable()
export class MailService {
    constructor(
        private readonly mailService: MailerService
    ){}

    async sendEmailVerify(user: User, code: number){
        const number = Math.floor(100000 + Math.random() * 900000);
        await this.mailService.sendMail({
            to: 'skenar@stilus.com.tr',
            subject: 'Account Verification Email',
            template: './email-verify',
            context: {
                number: code,
            },
            sender: 'Take a Trip',
        });
    }
}