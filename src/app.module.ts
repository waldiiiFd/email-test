// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'cocoloco02',
      database: 'email-test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
