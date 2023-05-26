import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";

@Injectable()
export class MailService {
    private sender = "Take a Trip";

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
            sender: this.sender,
        });
    }

    async complainCreateMail(companyMail: string,subject: string, message:string) {
        await this.mailService.sendMail({
            to: ['kenarsezer08@gmail.com', companyMail],
            subject: 'New Complain',
            html: `
                <div>
                    <h4>${subject}</h4>
                    <p>${message}</p>
                </div>
            `,
            context:{
                subject,
                message,
            },
            sender: this.sender,

        })
    }
}