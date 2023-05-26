import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from "./mail.service";

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    auth: {
                        user: config.get<string>('mailUser'),
                        pass: config.get<string>('mailPassword'),
                    },
                    host: config.get<string>('mailHost'),
                    port: config.get<number>('mailPort')
                },
                defaults: {
                    from: `Take A Trip <${config.get<string>('mailUser')}>`,
                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                      strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        })
    ],
    providers: [MailService],
    exports: [MailService],
})

export class MailModule {};