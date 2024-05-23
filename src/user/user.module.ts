// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entities/user.entity';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [TypeOrmModule.forFeature([user]),MailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
