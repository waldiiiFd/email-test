// src/user/user.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { user } from './entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user) private readonly userRepository: Repository<user>,
    private mailService:MailService,
  ) {}

  async create_user(createUserDto: CreateUserDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (foundUser) {
      throw new BadRequestException(
        `User with email '${createUserDto.email}' already exists`,
      );
    }

    const newUser = new user();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.role = createUserDto.role;

    const createdUser = await this.userRepository.save(newUser);

    if (newUser.role === 'Cliente') {
      try {
        await this.mailService.sendMail(newUser.email, newUser.name);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        throw new InternalServerErrorException('Failed to send welcome email',error);
      }
    }

    return createdUser;
  }

  async get_users(): Promise<user[]> {
    return await this.userRepository.find();
  }

  async get_user(id: number): Promise<user> {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async delete_user(email: string): Promise<void> {
    const userToDelete = await this.findOneByEmail(email);
    if (!userToDelete) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    await this.userRepository.remove(userToDelete);
  }

  async update_user(email: string, userUpdate: UpdateUserDto): Promise<user> {
    const userToUpdate = await this.findOneByEmail(email);
    if (!userToUpdate) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    if (userUpdate.current_password !== userToUpdate.password) {
      throw new UnauthorizedException('Current password does not match');
    }
    if (userUpdate.new_password) {
      userToUpdate.password = userUpdate.new_password;
    }
    const updatedUser = await this.userRepository.save(userToUpdate);
    return updatedUser;
  }
}
