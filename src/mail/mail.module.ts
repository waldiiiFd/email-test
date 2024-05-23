import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  exports: [MailService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log('MAIL_USER:', configService.get<string>('MAIL_USER'));
        console.log('MAIL_PASS:', configService.get<string>('MAIL_PASS'));
        return {
          transport: {
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
              user: 'pruebapwebwaldo@gmail.com',
              pass: 'metxhmtymjhjdrrt',
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from: `"No Reply" <pruebapwebwaldo@gmail.com>`,
          },
          template: {
            dir: 'src/mail/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
